import { Entity } from "@mikro-orm/core";
import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity({ abstract: true })
export class DoneRequest {
  @Field()
  done: boolean;
}
