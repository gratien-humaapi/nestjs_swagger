import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";
import { WithCurrentUser } from "src/common";
import { TenantRepository } from "./tenant.repository";
import { CreateTenantInput } from "./dto/create-tenant.input";
import { UpdateTenantInput } from "./dto/update-tenant.input";

@Injectable()
export class TenantService {
  constructor(private readonly tenantRepository: TenantRepository) {}

  async create(input: CreateTenantInput) {
    try {
      const tenant = this.tenantRepository.create({
        ...input
      });

      // eslint-disable-next-line max-len
      await this.tenantRepository.persistAndFlush(tenant);
      console.log(tenant);
      return tenant;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async findAll(currentUser: WithCurrentUser) {
    try {
      const currencies = await this.tenantRepository.find(
        {}
        // {
        //   filters: { currentUser }
        // }
      );
      // eslint-disable-next-line max-len

      return currencies;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  /**
   * Get Tenant by ID
   */
  async findOne(id: string) {
    try {
      const tenant = await this.tenantRepository.findOne({ id });
      return tenant;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async update(input: UpdateTenantInput) {
    const { id, ...rest } = input;
    try {
      const tenant = await this.tenantRepository.findOneOrFail({ id });
      this.tenantRepository.assign(tenant, rest);
      await this.tenantRepository.flush();
      return tenant;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async remove(id: string) {
    try {
      const tenant = await this.tenantRepository.findOneOrFail({ id });
      await this.tenantRepository.removeAndFlush(tenant);

      return tenant;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }
}
