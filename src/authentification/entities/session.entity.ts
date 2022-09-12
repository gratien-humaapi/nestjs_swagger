import {
  Entity,
  EntityRepositoryType,
  OptionalProps,
  PrimaryKey,
  Property,
  EntityValidator,
  ManyToOne
} from "@mikro-orm/core";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";
// import { User } from "src/user/entities/user.entity";
import { v4 } from "uuid";
// eslint-disable-next-line import/no-cycle
import { SessionRepository } from "../repositories/session.repository";

@ObjectType()
@Entity({ customRepository: () => SessionRepository })
export class Session {
  [EntityRepositoryType]?: SessionRepository;
  [OptionalProps]?: "createdAt" | "updatedAt";

  @Field(() => ID)
  @PrimaryKey()
  id: string = v4();

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  device: string;

  @Property()
  token: string;

  // @ManyToOne()
  // user: User;
}
