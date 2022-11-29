/* eslint-disable import/no-cycle */
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";
import { IsBusinessIndustry } from "src/common/validators";
import { IndustryRepository } from "../industry.repository";

@Entity({ customRepository: () => IndustryRepository })
@ObjectType()
export class Industry {
  @Property()
  // @Field()
  section: string;

  // @Field()
  @PrimaryKey()
  @IsBusinessIndustry()
  code: string;

  @Property()
  // @Field()
  name: string;

  @Property()
  // @Field()
  level: string;

  @Property()
  // @Field()
  categoryName: string;
}
