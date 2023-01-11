/* eslint-disable max-classes-per-file */
import { UsePipes } from "@nestjs/common";
import {
  Args,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";
import { AuthUser } from "src/admin/entities";
import { DoneRequest, GqlValidationPipe } from "src/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { SetUserPasswordInput } from "./dto/user-password-input";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

@UsePipes(GqlValidationPipe)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => User)
  createUser(@Args("input") input: CreateUserInput) {
    return this.userService.adminCreateUser(input);
  }

  @Mutation(() => DoneRequest)
  adminDeleteUser(@Args("username") username: string) {
    return this.userService.adminDeleteUser({ username });
  }

  @Mutation(() => DoneRequest)
  adminConfirmSignUp(@Args("username") username: string) {
    return this.userService.adminConfirmSignUp({ username });
  }

  @Mutation(() => DoneRequest)
  adminSetUserPassword(@Args("input") input: SetUserPasswordInput) {
    return this.userService.adminSetUserPassword(input);
  }

  // @Mutation(() => User)
  // updateUser(@Args("input") input: UpdateUserInput) {
  //   return this.userService.update(input);
  // }

  // @Mutation(() => User)
  // removeUser(@Args("id", { type: () => GraphQLUUID }) id: string) {
  //   return this.userService.remove(id);
  // }

  // // // -------------------------------------------------------------------------
  // // // Query
  // // // -------------------------------------------------------------------------
  @Query(() => AuthUser)
  getUser(@Args("username") username: string) {
    return this.userService.adminGetUser({ username });
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
