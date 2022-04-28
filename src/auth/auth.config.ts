import { registerAs } from "@nestjs/config";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
export interface IAuthConfig {
  userPoolId: string;
  clientId: string;
  region: string;
  authority: string;
}

const { env } = process;

// const authConfigCallBack: () => IAuthConfig = () => ({
//   authConfig: {
//     userPoolId: env.COGNITO_USER_POOL_ID!,
//     clientId: env.COGNITO_CLIENT_ID!,
//     region: env.COGNITO_REGION!,
//     authority: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}`
//   }
// });

export default registerAs("authConfig", () => ({
  userPoolId: env.COGNITO_USER_POOL_ID!,
  clientId: env.COGNITO_CLIENT_ID!,
  region: env.COGNITO_REGION!,
  authority: `https://cognito-idp.${env.COGNITO_REGION}.amazonaws.com/${env.COGNITO_USER_POOL_ID}`
}));
