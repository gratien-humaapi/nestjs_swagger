import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CurrentUser, GqlValidationPipe } from "src/common";
import { ICurrentUser } from "src/auth";
import { TenantService } from "./tenant.service";
import { Tenant } from "./entities/tenant.entity";
import { CreateTenantInput } from "./dto/create-tenant.input";
import { UpdateTenantInput } from "./dto/update-tenant.input";

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) {}

  @Mutation(() => Tenant)
  createTenant(
    @Args("input", new GqlValidationPipe()) input: CreateTenantInput
  ) {
    return this.tenantService.create(input);
  }

  @Query(() => [Tenant], { name: "tenants" })
  findAll(@CurrentUser() currentUser: ICurrentUser) {
    const { owner, tenant } = currentUser;
    return this.tenantService.findAll({ owner, tenant });
  }

  @Query(() => Tenant, { name: "tenant" })
  findOne(@Args("id", { type: () => Int }) id: string) {
    return this.tenantService.findOne(id);
  }

  @Mutation(() => Tenant)
  updateTenant(@Args("input") input: UpdateTenantInput) {
    return this.tenantService.update(input);
  }

  @Mutation(() => Tenant)
  removeTenant(@Args("id", { type: () => Int }) id: string) {
    return this.tenantService.remove(id);
  }
}
