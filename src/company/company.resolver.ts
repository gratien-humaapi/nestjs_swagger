import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Info
} from "@nestjs/graphql";
import { fieldsToRelations, GqlValidationPipe } from "src/common";
import { GraphQLUUID } from "graphql-scalars";
import { Tenant } from "src/tenant";
import { GraphQLResolveInfo } from "graphql";
import { CompanyService } from "./company.service";
import { Company } from "./entities/company.entity";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  createCompany(
    @Args("input", new GqlValidationPipe()) input: CreateCompanyInput,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.companyService.create(input);
  }

  @Mutation(() => Company)
  updateCompany(
    @Args("input") input: UpdateCompanyInput,
    @Info() info: GraphQLResolveInfo
  ) {
    return this.companyService.update(input);
  }

  @Mutation(() => Company)
  removeCompany(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.companyService.remove(id);
  }
  @Query(() => [Company], { name: "companies" })
  findAll() {
    return this.companyService.findAll();
  }

  @Query(() => Company, { name: "company" })
  findOne(
    @Args("id", { type: () => GraphQLUUID }) id: string,
    @Info() info: GraphQLResolveInfo
  ) {
    const relationPaths = fieldsToRelations(info);
    console.log(relationPaths);
    return this.companyService.findOne(id);
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
