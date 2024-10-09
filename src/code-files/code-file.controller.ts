import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags
} from "@nestjs/swagger";
import { ValidationRequestException } from "src/common/errors";
import { HMValidationPipe } from "../common/pipes";
import { CodeFileService } from "./code-file.service";
import { CreateCodeFileDto } from "./dto";
import { CodeFile } from "./entities/code-file.entity";
import { GetCodeFileDto } from "./dto/get-code-file.dto";

export class FindDto {
  repositoryName: string;
  filePath: string;
}

class FindAllDto {}

@Controller("files")
@ApiTags("files")
@ApiBadRequestResponse({ type: ValidationRequestException })
export class CodeFileController {
  constructor(private codeFileService: CodeFileService) {}

  // @Post()
  // @ApiOkResponse({type: CodeFile})
  // @HttpCode(200)
  // async createCodeFile(@Body(new HMValidationPipe()) dto: CreateCodeFileDto) {
  //  return this.codeFileService.create(dto);
  // }

  // @Put(":id")
  // @ApiOkResponse({type: CodeFile})
  // async updateCodeFile(
  //   @Param("id", ParseUUIDPipe) id: string,
  //   @Body(new HMValidationPipe()) dto: UpdateCodeFileDto
  // ) {
  //   return  this.codeFileService.update(id, dto);
  // }

  // @Delete(":id")
  // @ApiOkResponse({type: OkResponse})
  // async removeCodeFile(
  //   @Param("id", ParseUUIDPipe) id: string,
  // ) {
  //   return  this.codeFileService.remove(id);
  // }

  @Get()
  @ApiOkResponse({ type: [CodeFile] })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async findCodeFiles() {
    return this.codeFileService.findAll();
  }

  @Get(":name")
  @ApiOkResponse({ type: CodeFile })
  async findCodeFileByName(
    @Param("name") name: string,
    @Query() dto: GetCodeFileDto
  ) {
    console.log(dto);

    return this.codeFileService.findOneByName(name, dto);
  }

  @Get(":id")
  @ApiOkResponse({ type: CodeFile })
  async findCodeFileById(@Param("id", ParseUUIDPipe) id: string) {
    return this.codeFileService.findOneById(id);
  }
}
