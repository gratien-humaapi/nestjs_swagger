import { PartialType } from "@nestjs/swagger";
import { CreateCodeFileDto } from "./create-code-file.dto";


export class UpdateCodeFileDto extends PartialType(CreateCodeFileDto) {}