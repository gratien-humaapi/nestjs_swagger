/* eslint-disable max-classes-per-file */
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Info,
  ObjectType,
  Field
} from "@nestjs/graphql";
import { GqlValidationPipe } from "src/common";
import { GraphQLResolveInfo } from "graphql";
import { Company, CompanyService, CreateCompanyInput } from "src/company";
import { AdminCreateUserInput, AdminSetUserPasswordInput } from "./dto";
import { AdminService } from "./services";
import { AuthUser } from "./entities";

@ObjectType()
class TempClass {
  @Field()
  done: boolean;
}

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
    @Info() info: GraphQLResolveInfo
  ) {
    return this._companyService.create(input);
  }

  @Mutation(() => AuthUser)
  adminCreateUser(@Args("input") input: AdminCreateUserInput) {
    return this._adminService.adminCreateUser(input);
  }

  @Mutation(() => TempClass)
  adminDeleteUser(@Args("username") username: string) {
    return this._adminService.adminDeleteUser({ username });
  }

  @Mutation(() => TempClass)
  adminConfirmSignUp(@Args("username") username: string) {
    return this._adminService.adminConfirmSignUp({ username });
  }

  @Mutation(() => TempClass)
  adminSetUserPassword(@Args("input") input: AdminSetUserPasswordInput) {
    return this._adminService.adminSetUserPassword(input);
  }

  // // // -------------------------------------------------------------------------
  // // // Query
  // // // -------------------------------------------------------------------------

  // @Query(() => [Company], { name: "companies" })
  // findAll() {
  //   return this.companyService.findAll();
  // }

  @Query(() => AuthUser)
  adminGetUser(@Args("username") username: string) {
    return this._adminService.adminGetUser({ username });
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
