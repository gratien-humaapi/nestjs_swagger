import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CompanyService } from "./company.service";
import { CompanyResolver } from "./company.resolver";
import { Company } from "./entities/company.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Company])],
  providers: [CompanyResolver, CompanyService]
})
export class CompanyModule {}
