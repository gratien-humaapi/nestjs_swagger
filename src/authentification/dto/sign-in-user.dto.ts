import { IsString, IsInt, IsEmail } from "class-validator";
import { ICognitoService } from "src/cognito";

type SignIn = ICognitoService["signIn"];
export class SignInUserDto implements SignIn {
  @IsEmail()
  username: string;
  @IsString()
  password: string;
}

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }
