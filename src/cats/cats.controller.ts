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
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./cat.interface";
import { ValidationPipe } from "./validation.pipe";
import { RolesGuard } from "./roles.guard";
import { Roles } from "./roles.decorator";
import { LoggingInterceptor } from "./logging.interceptor";

@UseInterceptors(LoggingInterceptor)
@Controller("cats")
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles("admin")
  // @UseFilters(HttpExceptionFilter)
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    // throw new UnauthorizedException(null, "ffd");
    return this.catsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}
