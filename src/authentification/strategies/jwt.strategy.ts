import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { CognitoService } from "src/cognito";
import { passportJwtSecret } from "jwks-rsa";
import { IidTokenDecoded } from "./jwt-strategy.types";
import { ICurrentUser } from "./type";

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
      audience: _cognitoService.clientId,
      algorithms: ["RS256"],
      passReqToCallback: false
    });
  }

  async validate(payload: IidTokenDecoded) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { aud } = payload;
    if (aud === this._cognitoService.clientId) {
      const currentUser: ICurrentUser = {
        owner: payload["custom:owner"],
        tenant: payload["custom:tenant"],
        company: payload["custom:company"],
        role: payload["custom:role"]
      };
      this._cognitoService.currentUser = currentUser;
      return currentUser;
    }

    return false;
  }
}
