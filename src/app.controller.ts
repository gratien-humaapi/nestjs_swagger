import { Controller, Get, Post, Body } from "@nestjs/common";
import { CatsService } from "./cats/cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./types/cat.interface";

@Controller("cats")
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
