import { Resolver, Query, Mutation, Args, Info } from "@nestjs/graphql";
import {
  GqlSelections,
  fieldsToRelations,
  GqlValidationPipe
} from "src/common";
import { GraphQLUUID } from "graphql-scalars";
import { Tenant } from "src/tenant";
import { GraphQLResolveInfo } from "graphql";
import { AutoPath } from "@mikro-orm/core/typings";
import { Company, CompanyService, CreateCompanyInput } from "src/company";

@Resolver()
export class AdminResolver {
  constructor(private readonly companyService: CompanyService) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => Company)
  adminCreateCompany(
    @Args("input", new GqlValidationPipe()) input: CreateCompanyInput,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.companyService.create(input);
  }

  // @Mutation(() => Company)
  // updateCompany(@Args("input") input: UpdateCompanyInput) {
  //   return this.companyService.update(input);
  // }

  // @Mutation(() => Company)
  // removeCompany(@Args("id", { type: () => GraphQLUUID }) id: string) {
  //   return this.companyService.remove(id);
  // }

  // // // -------------------------------------------------------------------------
  // // // Query
  // // // -------------------------------------------------------------------------

  // @Query(() => [Company], { name: "companies" })
  // findAll() {
  //   return this.companyService.findAll();
  // }

  // @Query(() => Company, { name: "company" })
  // findOne(
  //   @Args("id", { type: () => GraphQLUUID }) id: string,
  //   @GqlSelections() populate: AutoPath<Company, string>[]
  // ) {
  //   return this.companyService.findOne({ id, populate });
  // }

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
