import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { GqlValidationPipe } from "src/common";
import { GraphQLUUID } from "graphql-scalars";
import { CompanyService } from "./company.service";
import { Company } from "./entities/company.entity";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Mutation(() => Company)
  createCompany(
    @Args("input", new GqlValidationPipe()) input: CreateCompanyInput
  ) {
    return this.companyService.create(input);
  }

  @Mutation(() => Company)
  updateCompany(@Args("input") input: UpdateCompanyInput) {
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
  findOne(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.companyService.findOne(id);
  }
}
