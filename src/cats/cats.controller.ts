import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseFilters,
  ForbiddenException,
  Param,
  ParseIntPipe,
  UsePipes
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./cat.interface";
import { HttpExceptionFilter } from "./http-exception.filter";
import { ValidationPipe } from "./validation.pipe";

@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UseFilters(HttpExceptionFilter)
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    throw new UnauthorizedException(null, "ffd");
    return this.catsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}
