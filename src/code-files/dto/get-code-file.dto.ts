import { ApiProperty } from "@nestjs/swagger";

export class GetCodeFileDto {
  @ApiProperty()
  repositoryName: string;

  @ApiProperty()
  filePath: string;
}
