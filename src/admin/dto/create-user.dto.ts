import {
  IsString,
  IsInt,
  IsJSON,
  IsArray,
  IsEmail,
  IsBoolean
} from "class-validator";
import { AttributeCognitoNormalizedType } from "src/cognito";

export class AdminCreateUserDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsArray()
  attributes: AttributeCognitoNormalizedType[];

  @IsString()
  temporaryPassword: string | undefined;

  @IsBoolean()
  sendPassword = false;

  desiredDeliveryMediums: string[] | undefined;
}

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }
