import { EntityRepository } from "@mikro-orm/postgresql";
// eslint-disable-next-line import/no-cycle
import { Currency } from "./entities/currency.entity";

export class CurrencyRepository extends EntityRepository<Currency> {}
