import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { CurrencyService } from "./currency.service";
import { CurrencyResolver } from "./currency.resolver";
import { Currency } from "./entities/currency.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Currency])],
  providers: [CurrencyResolver, CurrencyService]
})
export class CurrencyModule {}
