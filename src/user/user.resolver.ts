import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CurrentUser, GqlValidationPipe } from "src/common";
import { ICurrentUser } from "src/authentification";
import { GraphQLUUID } from "graphql-scalars";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args("input") input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  updateUser(@Args("input") input: UpdateUserInput) {
    return this.userService.update(input);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.userService.remove(id);
  }
  @Query(() => [User], { name: "users" })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.userService.findOne(id);
  }
}
