import { Injectable } from "@nestjs/common";
import { TenantRepository } from "./tenant.repository";
import { CreateTenantInput } from "./dto/create-tenant.input";
import { UpdateTenantInput } from "./dto/update-tenant.input";

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

  /**
   * Create tenant
   */
  async create(input: CreateTenantInput) {
    const tenant = this.tenantRepository.create({
      ...input
    });

    // eslint-disable-next-line max-len
    await this.tenantRepository.persistAndFlush(tenant);
    return tenant;
  }

  /**
   * Update Tenant by ID
   */
  async update(input: UpdateTenantInput) {
    const { id, ...rest } = input;

    const tenant = await this.tenantRepository.findOneOrFail({ id });

    this.tenantRepository.assign(tenant, rest);
    await this.tenantRepository.flush();
    return tenant;
  }

  /**
   * Remove Tenant by ID
   */
  async remove(id: string) {
    const tenant = await this.tenantRepository.findOneOrFail({ id });
    await this.tenantRepository.removeAndFlush(tenant);

    return tenant;
  }

  /**
   * List all Tenant
   */
  async findAll() {
    const tenants = await this.tenantRepository.findAll();
    return tenants;
  }

  /**
   * Get Tenant by ID
   */
  async findOne(id: string) {
    const tenant = await this.tenantRepository.findOneOrFail({ id });
    return tenant;
  }
}
