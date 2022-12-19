import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Currency } from "src/currency/entities/currency.entity";
import { TenantModule } from "src/tenant/tenant.module";
import { CompanyResolver } from "./company.resolver";
import { CompanyService } from "./company.service";
import { Company } from "./entities/company.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Company, Currency]), TenantModule],
  providers: [CompanyResolver, CompanyService],
  exports: [CompanyService]
})
export class CompanyModule {}
