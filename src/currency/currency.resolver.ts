import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CurrentUser, GqlValidationPipe } from "src/common";
import { ICurrentUser } from "src/authentification";
import { CurrencyService } from "./currency.service";
import { Currency } from "./entities/currency.entity";
import { CreateCurrencyInput } from "./dto/create-currency.input";
import { UpdateCurrencyInput } from "./dto/update-currency.input";

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => Currency)
  createCurrency(
    @CurrentUser() currentUser: ICurrentUser,
    @Args("input", new GqlValidationPipe()) input: CreateCurrencyInput
  ) {
    const { owner, tenant } = currentUser;

    return this.currencyService.create({ owner, tenant, ...input });
  }

  @Mutation(() => Currency)
  updateCurrency(@Args("input") input: UpdateCurrencyInput) {
    return this.currencyService.update(input);
  }

  @Mutation(() => Currency)
  removeCurrency(@Args("id", { type: () => Int }) id: string) {
    return this.currencyService.remove(id);
  }

  // // -------------------------------------------------------------------------
  // // Query
  // // -------------------------------------------------------------------------

  @Query(() => [Currency], { name: "currencies" })
  findAll(@CurrentUser() currentUser: ICurrentUser) {
    const { owner, tenant } = currentUser;
    return this.currencyService.findAll({ owner, tenant });
  }

  @Query(() => Currency, { name: "currency" })
  findOne(@Args("id", { type: () => Int }) id: string) {
    return this.currencyService.findOne(id);
  }

  @Query(() => Currency, { name: "currencyByCode" })
  findOneByCode(@Args("code") code: string) {
    return this.currencyService.findOneByCode(code);
  }
}
