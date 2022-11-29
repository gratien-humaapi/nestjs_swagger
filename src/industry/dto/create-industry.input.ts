import { Field, InputType, PartialType } from "@nestjs/graphql";
import { Industry } from "../entities/industry.entity";

@InputType()
export class CreateIndustryInput {
  @Field()
  section: string;

  @Field()
  code: string;

  @Field()
  name: string;

  @Field()
  level: string;

  @Field()
  categoryName: string;
}
