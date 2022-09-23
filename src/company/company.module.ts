import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Currency } from "src/currency/entities/currency.entity";
import { CompanyService } from "./company.service";
import { CompanyResolver } from "./company.resolver";
import { Company } from "./entities/company.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Company, Currency])],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
