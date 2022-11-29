import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateIndustryInput } from "./dto/create-industry.input";
import { Industry } from "./entities/industry.entity";
import { IndustryService } from "./industry.service";

@Resolver(() => Industry)
export class IndustryResolver {
  constructor(private readonly industryService: IndustryService) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => Industry)
  createIndustry(@Args("input") input: CreateIndustryInput) {
    return this.industryService.createIndustry(input);
  }

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Query(() => [Industry])
  findAllIndustries() {
    return this.industryService.getIndustries();
  }
  @Query(() => [Industry])
  findIndustryByName(@Args("name") name: string) {
    return this.industryService.getIndustryByName(name);
  }
}
