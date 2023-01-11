import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CurrentUser, GqlValidationPipe } from "src/common";
import { ICurrentUser } from "src/authentification";
import { UsePipes } from "@nestjs/common";
import { CurrencyService } from "./currency.service";
import { Currency } from "./entities/currency.entity";
import { CreateCurrencyInput } from "./dto/create-currency.input";
import { UpdateCurrencyInput } from "./dto/update-currency.input";

@UsePipes(GqlValidationPipe)
@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => Currency)
  createCurrency(
    @CurrentUser() currentUser: ICurrentUser,
    @Args("input") input: CreateCurrencyInput
  ) {
    const { owner, tenant, company } = currentUser;

    return this.currencyService.create({
      owner,
      tenant,
      company,
      ...input
    });
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
    const { owner, tenant, role, company } = currentUser;
    return this.currencyService.findAll({
      owner,
      tenant,
      role,
      company
    });
  }

  @Query(() => [Currency], { name: "currenciesByCode" })
  findAllByCode(@Args("code") code: string) {
    return this.currencyService.findAllByCode(code);
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
