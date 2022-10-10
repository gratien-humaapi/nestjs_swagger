import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CurrentUser, GqlValidationPipe } from "src/common";
import { GraphQLUUID } from "graphql-scalars";
import { UsePipes } from "@nestjs/common";
import { TenantService } from "./tenant.service";
import { Tenant } from "./entities/tenant.entity";
import { CreateTenantInput } from "./dto/create-tenant.input";
import { UpdateTenantInput } from "./dto/update-tenant.input";

@UsePipes(GqlValidationPipe)
@Resolver(() => Tenant)
export class TenantResolver {
  constructor(private readonly tenantService: TenantService) {}

  @Mutation(() => Tenant)
  createTenant(@Args("input") input: CreateTenantInput) {
    return this.tenantService.create(input);
  }

  @Mutation(() => Tenant)
  updateTenant(@Args("input") input: UpdateTenantInput) {
    return this.tenantService.update(input);
  }

  @Mutation(() => Tenant)
  removeTenant(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.tenantService.remove(id);
  }
  @Query(() => [Tenant], { name: "tenants" })
  findAll() {
    return this.tenantService.findAll();
  }

  @Query(() => Tenant, { name: "tenant" })
  findOne(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.tenantService.findOne(id);
  }
}
