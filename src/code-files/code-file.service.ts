import { EntityManager } from "@mikro-orm/sqlite";
import { Injectable } from "@nestjs/common";
import { OkResponse } from "../common/responses";
import { GithubService } from "../github/github.service";
import { FindDto } from "./code-file.controller";
import { CodeFileRepository } from "./code-file.repository";

@Injectable()
export class CodeFileService {
  constructor(
    private readonly catRepository: CodeFileRepository,
    private readonly em: EntityManager,
    private readonly githubService: GithubService
  ) {}

  findAll = async () => {
    return this.catRepository.findAll();
  };

  findOneById = async (id: string) => {
    return this.catRepository.findOne({ id });
  };

  findOneByName = async (name: string, dto: FindDto) => {
    const {filePath,repositoryName} =dto;
    const splittedRepoName = repositoryName.split("/");

    this.githubService.getFileGithub(splittedRepoName[0], splittedRepoName[1], `${filePath}/${name}`);
  };

  remove = async (id: string) => {
    await this.catRepository.nativeDelete({ id });
    return new OkResponse()
  };
}
