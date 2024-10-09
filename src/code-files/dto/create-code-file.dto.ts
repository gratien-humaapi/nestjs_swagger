import { OmitType } from "@nestjs/swagger";
import { CodeFile } from "../entities/code-file.entity";

export class CreateCodeFileDto extends  OmitType(CodeFile, ['id'] as const) {}
