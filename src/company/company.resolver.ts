import { Resolver, Query, Mutation, Args, Info } from "@nestjs/graphql";
import {
  GqlSelections,
  fieldsToRelations,
  GqlValidationPipe,
  CurrentUser
} from "src/common";
import { GraphQLUUID } from "graphql-scalars";
import { Tenant } from "src/tenant";
import { GraphQLResolveInfo } from "graphql";
import { AutoPath } from "@mikro-orm/core/typings";
import { UsePipes } from "@nestjs/common";
import { ICurrentUser } from "src/authentification";
import { CompanyService } from "./company.service";
import { Company } from "./entities/company.entity";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";

@UsePipes(GqlValidationPipe)
@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => Company)
  createCompany(
    @CurrentUser() currentUser: ICurrentUser,
    @Args("input") input: CreateCompanyInput,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.companyService.create(input, currentUser);
  }

  @Mutation(() => Company)
  updateCompany(
    @CurrentUser() currentUser: ICurrentUser,
    @Args("input") input: UpdateCompanyInput
  ) {
    return this.companyService.update(input, currentUser);
  }

  @Mutation(() => Company)
  removeCompany(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.companyService.remove(id);
  }

  // // -------------------------------------------------------------------------
  // // Query
  // // -------------------------------------------------------------------------

  @Query(() => [Company], { name: "companies" })
  findAll(
    @CurrentUser() currentUser: ICurrentUser,
    @GqlSelections() populate: AutoPath<Company, string>[]
  ) {
    return this.companyService.findAll({ populate, currentUser });
  }

  @Query(() => [Company], { name: "companiesByName" })
  findAllByName(
    @Args("name") name: string,
    @GqlSelections() populate: AutoPath<Company, string>[]
  ) {
    return this.companyService.findAllByName({ name, populate });
  }

  @Query(() => Company, { name: "company" })
  findOne(
    @CurrentUser() currentUser: ICurrentUser,
    @Args("id", { type: () => GraphQLUUID }) id: string,
    @GqlSelections() populate: AutoPath<Company, string>[]
  ) {
    console.log(populate);

    return this.companyService.findOne({ id, populate, currentUser });
  }

  @Query(() => Company, { name: "companyByName" })
  findOneByName(
    @CurrentUser() currentUser: ICurrentUser,
    @Args("name") name: string,
    @GqlSelections() populate: AutoPath<Company, string>[]
  ) {
    return this.companyService.findOneByName({ currentUser, name, populate });
  }

  // // -------------------------------------------------------------------------
  // // Resolve fields (extend fields on the entity)
  // // -------------------------------------------------------------------------

  // @ResolveField("tenant", () => Tenant)
  // async tenant(
  //   @Parent() parent: Company,
  //   @Args("limit", { nullable: true }) limit: number
  // ) {
  //   return parent.tenant;
  // }
}
