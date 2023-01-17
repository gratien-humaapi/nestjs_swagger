import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { TenantService } from "./tenant.service";
import { TenantResolver } from "./tenant.resolver";
import { Tenant } from "./entities/tenant.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Tenant])],
  providers: [TenantResolver, TenantService],
  exports: [TenantService]
})
export class TenantModule {}
