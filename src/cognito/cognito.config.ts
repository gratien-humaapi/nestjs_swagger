import { registerAs } from "@nestjs/config";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export interface ICognitoConfig {
  userPoolId: string;
  clientId: string;
  clientSecret: string;
  region: string;
  authority: string;
}

const { env } = process;

export default registerAs("cognitoConfig", () => ({
  userPoolId: env.COGNITO_USER_POOL_ID!,
  clientId: env.COGNITO_CLIENT_ID!,
  region: env.COGNITO_REGION!,
  clientSecret: env.COGNITO_CLIENT_SECRET!,
  authority: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}`
}));
