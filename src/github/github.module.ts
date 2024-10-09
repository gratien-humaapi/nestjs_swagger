import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import githubConfig from "./github.config";
import { GithubService } from "./github.service";

@Module({
  imports: [ConfigModule.forFeature(githubConfig)],
  providers: [GithubService],
  exports: [GithubService]
})
export class GithubModule {}
