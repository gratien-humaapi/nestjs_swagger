import { IidTokenDecoded } from "../strategies/jwt-strategy.types";

export const parseJwt = (token: string) => {
  if (!token) {
    throw new Error("token must be not null");
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString()
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  const parsedJwt = JSON.parse(jsonPayload) as IidTokenDecoded;

  return parsedJwt;
};
