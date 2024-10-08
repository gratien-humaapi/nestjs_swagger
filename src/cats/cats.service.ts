import { EntityManager } from "@mikro-orm/sqlite";
import { Injectable } from "@nestjs/common";
import { v4 } from "uuid";
import { CatRepository } from "./cats.repository";
import { CreateCatDto } from "./dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { OkResponse } from "src/common/responses";

@Injectable()
export class CatsService {
  constructor(
    private readonly catRepository: CatRepository,
    private readonly em: EntityManager
  ) {}

  create = async (dto: CreateCatDto) => {
    const input = { id: v4(), ...dto };
    const res = this.catRepository.create(input);
    await this.em.flush();
    console.log(res);
    return res;
  };

  update = async (id: string, dto: UpdateCatDto) => {
    const cat = await this.catRepository.findOneOrFail({ id });
    this.catRepository.assign(cat, dto);
    await this.em.flush();
    return cat;
  };

  findAll = async () => {
    return this.catRepository.findAll();
  };

  findOne = async (id: string) => {
    return this.catRepository.findOne({ id });
  };

  remove = async (id: string) => {
    await this.catRepository.nativeDelete({ id });
    return new OkResponse()
  };
}
