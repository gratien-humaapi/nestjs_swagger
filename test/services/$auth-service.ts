/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from "cross-fetch";

interface IAuthenticationResult {
  accessToken: string;
  expiresIn: number;
  idToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface I$AuthService {
  client: (body: Record<string, any>) => Promise<Response>;
  signInParam: {
    username: string;
    password: string;
  };
}

export class $AuthService {
  client: I$AuthService["client"];

  constructor(url: string) {
    this.client = async (params: any) =>
      fetch(`${url}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(params)
      });
  }

  signIn = async (params: I$AuthService["signInParam"]) => {
    try {
      const res = (await (
        await this.client(params)
      ).json()) as IAuthenticationResult;
      return res;
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };
}

export const authService = (url: string) => new $AuthService(url);
