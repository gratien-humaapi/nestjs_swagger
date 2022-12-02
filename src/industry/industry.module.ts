import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { Industry } from "./entities/industry.entity";
import { IndustryResolver } from "./industry.resolver";
import { IndustryService } from "./industry.service";

@Module({
  imports: [MikroOrmModule.forFeature([Industry])],
  providers: [IndustryResolver, IndustryService]
})
export class IndustryModule {}
