/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/naming-convention */
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
    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, HMAuthSDKError);
    // }

    this.message = errObj.message ? errObj.message : "";
    this.name = errObj.name ? errObj.name : "UnknowError";
    this.statusCode = errObj.statusCode;
  }
}

export enum CognitoUserStatusEnum {
  ARCHIVED = "ARCHIVED",
  COMPROMISED = "COMPROMISED",
  CONFIRMED = "CONFIRMED",
  FORCE_CHANGE_PASSWORD = "FORCE_CHANGE_PASSWORD",
  RESET_REQUIRED = "RESET_REQUIRED",
  UNCONFIRMED = "UNCONFIRMED",
  UNKNOWN = "UNKNOWN"
}

interface IAuthenticationResult {
  authenticationResult?: {
    accessToken: string;
    accessTokenExpiresIn: number;
    tokenType: string;
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

  clientParams: {
    path: string;
    data?: Record<string, any>;
    withCredentials?: boolean;
    withAuthHeader?: boolean;
  };

  confirmForgotPasswordParams: {
    /** email or phone */
    username: string;
    /** token previously sent to user */
    confirmationCode: string;
    /** the new password */
    newPassword: string;
  };

  newPasswordRequired: {
    /** username */
    username: string;
    /** newPassword */
    newPassword: string;
  };

  forgotPasswordReturnType: {
    attributeName: string;
    deliveryMedium: string;
    destination: string;
  };

  options: {
    url: string;
    fetch?: WindowOrWorkerGlobalScope["fetch"];
  };
}

export interface IidTokenDecoded {
  sub: string;
  iss: string;
  aud: string; // the App client ID
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  email: string;
  email_verified: boolean;
  "cognito:username": string;
  "custom:tenantId": string;
  "custom:admin": string;
  "cognito:groups": string[];
}

export class HMAuthSDK {
  private _url: string;

  private _fetch: WindowOrWorkerGlobalScope["fetch"];

  private _accessToken = "";

  private _refreshToken = "";

  sessionflow = "";

  sub = "";

  email = "";

  groups: string[] = [];

  admin = false;

  owner = "";
  tenant = "";
  company = "";
  role = "";

  constructor(options: IHMAuthSDK["options"]) {
    const { url, fetch: preferredFetch } = options;

    // https://github.com/orbitjs/orbit/issues/452#issue-249808591
    // https://github.com/apollographql/apollo-client/blob/main/src/link/http/createHttpLink.ts#L154
    const currentFetch =
      preferredFetch || maybe(() => window.fetch.bind(window));

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this._fetch = currentFetch!;

    if (!url) {
      throw new Error("api url is not provided");
    }

    this._url = url;
  }

  set accessToken(data: string) {
    this._accessToken = data;
  }

  get accessToken() {
    return this._accessToken;
  }

  private _resetValues = () => {
    this._refreshToken = "";
    this.email = "";
    this._accessToken = "";
    this.admin = false;
    this.groups = [];
    this.sessionflow = "";
    this.sub = "";

    this.owner = "";
    this.tenant = "";
    this.company = "";
    this.role = "";
    // this._clearUIDInLocalStorage();
  };

  // eslint-disable-next-line class-methods-use-this
  private _decoder = (base64: string) => {
    if (Buffer.length) {
      return Buffer.from(base64, "base64");
    }

    return window.atob(base64);
  };

  private _client = async <T>(
    params: IHMAuthSDK["clientParams"]
  ): Promise<T | undefined> => {
    const { path, withAuthHeader, data, withCredentials } = params;

    // we should throw error if !res.ok https://stackoverflow.com/a/38236296
    try {
      const res = await this._fetch(`${this._url}/${path}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: withAuthHeader ? `Bearer ${this._accessToken}` : ""
        },
        body: JSON.stringify(data),
        credentials: withCredentials ? "include" : undefined,
        mode: "cors"
      });

      if (!res.ok) {
        const { message, name, statusCode } = await res.json();
        throw new HMAuthSDKError({ message, name, statusCode });
      }
      const isValidBody = await res.clone().text();
      if (!isValidBody) {
        return undefined;
      }
      const resJson = await res.json();

      return resJson;
    } catch (err) {
      /**
       * if fetch not resolve the first time, is probably network error
       * @see https://stackoverflow.com/a/61113372
       */
      const error = <any>err;

      if (error instanceof HMAuthSDKError) {
        throw error;
      }

      throw new Error("network error, please try again");
    }
  };

  private _deleteCookie = (name: string, path: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
  };

  // private _setUIDInLocalStorage = () => {
  //   if (!window) {
  //     return;
  //   }
  //   window.localStorage.setItem("uid", this.sub);
  // };

  // private _clearUIDInLocalStorage = () => {
  //   if (!window) {
  //     return;
  //   }
  //   window.localStorage.removeItem("uid");
  // };

  // https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library

  parseJwt = (token: string) => {
    if (!token) {
      throw new Error("token must be not null");
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      this._decoder(base64)
        .toString()
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    const parsedJwt = JSON.parse(jsonPayload) as IidTokenDecoded;

    // console.log(parsedJwt);

    this.email = parsedJwt.email;
    this.sub = parsedJwt.sub;
    this.groups = parsedJwt["cognito:groups"];
    this.admin = parsedJwt["custom:admin"] === "true";
    this.owner = parsedJwt["custom:owner"];
    this.tenant = parsedJwt["custom:tenant"];
    this.company = parsedJwt["custom:company"];
    this.role = parsedJwt["custom:role"];
    // this._setUIDInLocalStorage();

    return parsedJwt;
  };

  signIn = async (data: IHMAuthSDK["signInParam"]) => {
    const res = await this._client<IAuthenticationResult>({
      path: "auth/sign-in",
      data,
      withCredentials: true
    });

    if (res && res.session) {
      this._resetValues();
      this.sessionflow = res.session;
    }

    if (
      res &&
      res.authenticationResult &&
      res.authenticationResult.accessToken
    ) {
      this._accessToken = res.authenticationResult.accessToken;
      this.parseJwt(this._accessToken);
      this._refreshToken = res.authenticationResult.refreshToken;
    }
    return res;
  };

  newPasswordRequired = async (params: IHMAuthSDK["newPasswordRequired"]) => {
    if (!this.sessionflow) {
      throw new Error("session is invalid, please sign-in again");
    }
    const data = { ...params, session: this.sessionflow };
    const res = await this._client<IAuthenticationResult>({
      path: "auth/new-password-required",
      data
    });

    if (
      res &&
      res.authenticationResult &&
      res.authenticationResult.refreshToken
    ) {
      this.parseJwt(res.authenticationResult.accessToken);
      this._refreshToken = res.authenticationResult.refreshToken;
    }

    return res;
  };

  forgotPassword = async (username: string) => {
    const data = { username };
    const res = await this._client<IHMAuthSDK["forgotPasswordReturnType"]>({
      path: "auth/forgot-password",
      data
    });

    return res;
  };

  confirmForgotPassword = async (
    data: IHMAuthSDK["confirmForgotPasswordParams"]
  ) => {
    const res = await this._client<{ done: boolean }>({
      path: "auth/confirm-forgot-password",
      data
    });
    return res;
  };

  signOut = async () => {
    try {
      this._deleteCookie("uid", "/token/web-refresh-tokens");
      this._resetValues();
      await this._client({ path: "auth/sign-out", withAuthHeader: true });
      return true;
    } catch (err) {
      const error = <any>err;
      throw new Error(error.message);
    } finally {
      return true;
    }
  };

  refreshToken = async (isWeb = true) => {
    type ResType =
      | Omit<
          NonNullable<IAuthenticationResult["authenticationResult"]>,
          "refreshToken"
        >
      | undefined;
    const web = isWeb ? "web-" : "";
    const { sub, _refreshToken } = this;
    const body = {
      sub: web ? undefined : sub,
      refreshToken: web ? undefined : _refreshToken
    };
    try {
      const res = await this._client<ResType>({
        path: `token/${web}refresh-tokens`,
        data: body,
        withCredentials: isWeb
      });
      if (!res) {
        this._resetValues();
      }
      this._accessToken = res!.accessToken;
      this.parseJwt(this._accessToken);
      const data = { ...res };

      return this._response(data);
    } catch (err) {
      const error = <HMAuthSDKError>err;
      return this._errorResponse(error);
    }
  };

  private _errorResponse = <T>(error: T) =>
    //   const err = errorParser(error);
    ({
      data: undefined,
      error
    });
  private _response = <T>(data: T) => ({
    data,
    error: undefined
  });
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
