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
  // username: string;
  email_verified: boolean;
  "cognito:username": string;
  "custom:tenantId": string;
  "custom:admin": string;
  "cognito:groups": string;
}
