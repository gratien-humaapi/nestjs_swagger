/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property } from "@mikro-orm/sqlite";
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
import { CustomBaseEntity } from "../../common";
import { CatRepository } from "../cats.repository";
import { ApiProperty } from "@nestjs/swagger";

type CustomOptionalProps = "isActive" | "description";

@Entity({ repository: () => CatRepository })
export class Cat extends CustomBaseEntity<CatRepository, CustomOptionalProps> {
  @Property()
  @ApiProperty({ description: "The age of a cat" })
  @IsString()
  @MinLength(5)
  name: string;

  @Property()
  @ApiProperty()
  @IsInt()
  age: number;

  @Property()
  @ApiProperty()
  @IsString()
  breed: string = "";
}
