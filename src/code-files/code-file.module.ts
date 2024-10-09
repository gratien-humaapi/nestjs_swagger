import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { CodeFileController } from "./code-file.controller";
import { CodeFileService } from "./code-file.service";
import { CodeFile } from "./entities/code-file.entity";
import { GithubModule } from "src/github/github.module";

@Module({
  imports: [MikroOrmModule.forFeature([CodeFile]), GithubModule],
  controllers: [CodeFileController],
  providers: [CodeFileService],
  exports: [CodeFileService]
})
export class CodeFileModule {}
