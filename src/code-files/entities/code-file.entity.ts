/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Entity, Property } from "@mikro-orm/sqlite";
import { IsInt, IsString, MaxLength, MinLength } from "class-validator";
import { CustomBaseEntity } from "../../common";
import { ApiProperty } from "@nestjs/swagger";
import { CodeFileRepository } from "../code-file.repository";

type CustomOptionalProps = "isActive" | "description";


@Entity({ repository: () => CodeFileRepository })
export class CodeFile extends CustomBaseEntity<
  CodeFileRepository,
  CustomOptionalProps
> {

  @Property()
  @ApiProperty({ description: "Nom du fichier" })
  @IsString()
  name: string;

  // @Property()
  // @ApiProperty({
  //   description: "Ensemble des fonctions internes et externes au fichier"
  // })
  // functions: CodeFunction[];

  @Property()
  @ApiProperty({ description: "Chemin du fichier sans le nom du fichier." })
  @IsString()
  path: string;

  @Property()
  @ApiProperty({ description: "L'extension du fichier." })
  @IsString()
  extension: string;
}
