import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { CognitoService } from "src/cognito";
import { passportJwtSecret } from "jwks-rsa";
import { jwtConstants } from "../constants";
import { IAccessTokenDecoded } from "./jwt-strategy.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _cognitoService: CognitoService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        /**
         * @see https://aws.amazon.com/fr/premiumsupport/knowledge-center/decode-verify-cognito-json-token/
         * @see https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
         * @see https://github.com/auth0/node-jwks-rsa
         */
        jwksUri: `${_cognitoService.authority}/.well-known/jwks.json`
      }),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: _cognitoService.authority,
      algorithms: ["RS256"]
    });
  }

  async validate(payload: IAccessTokenDecoded) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { client_id } = payload;
    if (client_id === this._cognitoService.clientId) {
      return { userId: payload.sub, username: payload.username };
    }

    return false;
  }
}
