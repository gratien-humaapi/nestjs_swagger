import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ICognitoService, CognitoService, AuthClientError } from "src/cognito";
import { isResolved } from "src/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private _cognitoService: CognitoService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: ICognitoService["login"]) {
    const res = await this._cognitoService.login(data);
    if (!isResolved(res)) {
      const { error } = res;
      console.log(error);

      throw new AuthClientError(error);
    }
    return res.data;
  }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload)
  //   };
  // }
}
