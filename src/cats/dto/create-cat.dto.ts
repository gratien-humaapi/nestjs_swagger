import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";
import { Cat } from "../entities/cats.entity";

export class CreateCatDto extends  OmitType(Cat, ['id'] as const) {}
