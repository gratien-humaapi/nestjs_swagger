import { EntityManager } from "@mikro-orm/sqlite";
import { Injectable } from "@nestjs/common";
import { v4 } from "uuid";
import { CreateCodeFileDto, UpdateCodeFileDto } from "./dto";
import { OkResponse } from "src/common/responses";
import { CodeFileRepository } from "./code-file.repository";
import { FindDto } from "./code-file.controller";
import { GithubService } from "src/github/github.service";

@Injectable()
export class CodeFileService {
  constructor(
    private readonly catRepository: CodeFileRepository,
    private readonly em: EntityManager,
    private readonly githubService: GithubService
  ) {}

  // create = async (dto: CreateCodeFileDto) => {
  //   const input = { id: v4(), ...dto };
  //   const res = this.catRepository.create(input);
  //   await this.em.flush();
  //   console.log(res);
  //   return res;
  // };

  // update = async (id: string, dto: UpdateCodeFileDto) => {
  //   const cat = await this.catRepository.findOneOrFail({ id });
  //   this.catRepository.assign(cat, dto);
  //   await this.em.flush();
  //   return cat;
  // };

  findAll = async () => {
    return this.catRepository.findAll();
  };

  findOneById = async (id: string) => {
    return this.catRepository.findOne({ id });
  };

  findOneByName = async (name: string, dto: FindDto) => {
    const {filePath,repositoryName} =dto;
    const splittedRepoName = repositoryName.split("/");

    this.githubService.getFileGithub(splittedRepoName[0], splittedRepoName[1], filePath);
  };

  remove = async (id: string) => {
    await this.catRepository.nativeDelete({ id });
    return new OkResponse()
  };
}
