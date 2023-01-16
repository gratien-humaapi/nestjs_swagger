/* eslint-disable max-classes-per-file */
import {
  Args,
  Field,
  Info,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { CurrentUser } from "src/common";
import { Company, CompanyService, CreateCompanyInput } from "src/company";
import { User } from "src/user/entities/user.entity";
import { AdminCreateUserInput, AdminSetUserPasswordInput } from "./dto";
import { AuthUser } from "./entities";
import { AdminService } from "./services";

// @ObjectType()
// class TempClass {
//   @Field()
//   done: boolean;
// }

@Resolver()
export class AdminResolver {
  constructor(
    private readonly _companyService: CompanyService,
    private readonly _adminService: AdminService
  ) {}

  // // -------------------------------------------------------------------------
  // // Mutation
  // // -------------------------------------------------------------------------

  @Mutation(() => Company)
  adminCreateCompany(
    @Args("input") input: CreateCompanyInput,
    @CurrentUser() currentUser,
    @Info() info: GraphQLResolveInfo
  ) {
    return this._companyService.create(input, currentUser);
  }

  // @Mutation(() => User)
  // adminCreateUser(@Args("input") input: AdminCreateUserInput) {
  //   return this._adminService.adminCreateUser(input);
  // }

  // @Mutation(() => TempClass)
  // adminDeleteUser(@Args("username") username: string) {
  //   return this._adminService.adminDeleteUser({ username });
  // }

  // @Mutation(() => TempClass)
  // adminConfirmSignUp(@Args("username") username: string) {
  //   return this._adminService.adminConfirmSignUp({ username });
  // }

  // @Mutation(() => TempClass)
  // adminSetUserPassword(@Args("input") input: AdminSetUserPasswordInput) {
  //   return this._adminService.adminSetUserPassword(input);
  // }

  // // // -------------------------------------------------------------------------
  // // // Query
  // // // -------------------------------------------------------------------------

  // @Query(() => [Company], { name: "companies" })
  // findAll() {
  //   return this.companyService.findAll();
  // }

  // @Query(() => AuthUser)
  // adminGetUser(@Args("username") username: string) {
  //   return this._adminService.adminGetUser({ username });
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
