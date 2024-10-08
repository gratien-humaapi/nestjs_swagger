import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags
} from "@nestjs/swagger";
import { ValidationRequestException } from "src/common/errors";
import { OkResponse } from "src/common/responses";
import { HMValidationPipe } from "../common/pipes";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { Cat } from "./entities/cats.entity";
import { LoggingInterceptor } from "./logging.interceptor";


@UseInterceptors(LoggingInterceptor)
@Controller("cats")
@ApiTags("cats")
@ApiBadRequestResponse({  type: ValidationRequestException})
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @ApiOkResponse({type: Cat})
  @HttpCode(200)
  async createCat(@Body(new HMValidationPipe()) dto: CreateCatDto) {
   return this.catsService.create(dto);
  }

  @Put(":id")
  @ApiOkResponse({type: Cat})
  async updateCat(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new HMValidationPipe()) dto: UpdateCatDto
  ) {
    return  this.catsService.update(id, dto);
  }


  @Delete(":id")
  @ApiOkResponse({type: OkResponse})
  async removeCat(
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return  this.catsService.remove(id);
  }

  
  @Get()
  @ApiOkResponse({ type: [Cat] })
  @ApiForbiddenResponse({ description: "Forbidden." })
  async findCats() {
    return this.catsService.findAll();
  }

  @Get(":id")
  @ApiOkResponse({type: Cat})
  async findCatById(@Param("id", ParseUUIDPipe) id: string) {
    return this.catsService.findOne(id);
  }
}
