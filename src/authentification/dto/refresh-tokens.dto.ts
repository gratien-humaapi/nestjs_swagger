import { IsString, IsUUID, MinLength } from "class-validator";

export class RefreshTokenDTO {
  @IsUUID()
  sub: string;

  @IsString()
  @MinLength(400)
  refreshToken: string;
}

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
// }
