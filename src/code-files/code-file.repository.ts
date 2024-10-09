import { EntityRepository } from "@mikro-orm/postgresql";
import { CodeFile } from "./entities/code-file.entity";

export class CodeFileRepository extends EntityRepository<CodeFile> {}
