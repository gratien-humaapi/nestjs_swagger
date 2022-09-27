/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class HMAuthSDKError extends Error {
  name: string;

  message: string; // for appsync error (errorType)

  statusCode: number;

  constructor(
    errObj: { statusCode: number; message: string; name: string },
    ...params: any[]
  ) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HMAuthSDKError);
    }

    this.message = errObj.message ? errObj.message : "";
    this.name = errObj.name ? errObj.name : "UnknowError";
    this.statusCode = errObj.statusCode;
  }
}

export enum StatusConfirmation {
  UNCONFIRMED = "UNCONFIRMED",
  CONFIRMED = "CONFIRMED",
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  UNKNOWN = "UNKNOWN",
  RESET_REQUIRED = "RESET_REQUIRED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
  NEW_PASSWORD_REQUIRED = "NEW_PASSWORD_REQUIRED"
}

interface IAuthenticationResult {
  authenticationResult?: {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  };
  challengeName?: string;
  challengeParameters?: {
    userIdForSrp: string;
    requiredAttributes: string;
    userAttributes: string;
  };
  session?: string;
}

export interface IHMAuthSDK {
  signInParam: {
    username: string;
    password: string;
  };

  newPasswordRequired: {
    /** username */
    username: string;
    /** newPassword */
    newPassword: string;
  };
  options: {
    url: string;
    fetch?: WindowOrWorkerGlobalScope["fetch"];
  };
}

export class HMAuthSDK {
  private _url: string;

  private _fetch: WindowOrWorkerGlobalScope["fetch"];

  accessToken = "";

  sessionflow = "";

  constructor(options: IHMAuthSDK["options"]) {
    const { url, fetch: preferredFetch } = options;

    // https://github.com/orbitjs/orbit/issues/452#issue-249808591
    // https://github.com/apollographql/apollo-client/blob/main/src/link/http/createHttpLink.ts#L154
    const currentFetch =
      preferredFetch || maybe(() => window.fetch.bind(window));

    this._fetch = currentFetch!;

    if (!url) {
      throw new Error("api url is not provided");
    }

    this._url = url;
  }

  private _client = async <T>(
    path: string,
    params: Record<string, any>
  ): Promise<T> => {
    // we should throw error if !res.ok https://stackoverflow.com/a/38236296

    const res = await this._fetch(`${this._url}/auth/${path}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      const { message, name, statusCode } = await res.json();
      throw new HMAuthSDKError({ message, name, statusCode });
    }
    return res.json();
  };

  signIn = async (params: IHMAuthSDK["signInParam"]) => {
    const res = await this._client<IAuthenticationResult>("sign-in", params);

    if (res.session) {
      this.sessionflow = res.session;
    }
    return res;
  };

  newPasswordRequired = async (params: IHMAuthSDK["newPasswordRequired"]) => {
    try {
      if (!this.sessionflow) {
        throw new Error("session is invalid, please sign-in again");
      }
      const data = { ...params, session: this.sessionflow };
      const res = await this._client<IAuthenticationResult>(
        "new-password-required",
        data
      );

      return res;
    } catch (err) {
      const error = <any>err;
      throw new Error(error.message);
    }
  };
}

// eslint-disable-next-line consistent-return
function maybe<T>(thunk: () => T): T | undefined {
  try {
    return thunk();
    // eslint-disable-next-line no-empty
  } catch {}
}

export const hmAuthSDK = (options: IHMAuthSDK["options"]) =>
  new HMAuthSDK(options);
