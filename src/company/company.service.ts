import { LoadStrategy } from "@mikro-orm/core";
import { AutoPath } from "@mikro-orm/core/typings";
import { Injectable } from "@nestjs/common";
import { CommonStatusEnum, CustomBaseEntity } from "src/common";
import { CurrencyRepository } from "src/currency/currency.repository";
import { Tenant } from "src/tenant";
import { TenantService } from "src/tenant/tenant.service";
import { CompanyRepository } from "./company.repository";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly currencyRepository: CurrencyRepository,
    private readonly tenantService: TenantService
  ) {}

  async create(input: CreateCompanyInput) {
    const currency = await this.currencyRepository.findOneOrFail({
      id: input.currencyId
    });

    // const isGroup = (!input.isGroup && !input.headOfficeId) ?? input.isGroup;
    let headOffice: Company | undefined;
    let tenant: Tenant | undefined;

    if (input.headOfficeId) {
      headOffice = await this.findOne({ id: input.headOfficeId });
    } else {
      tenant = await this.tenantService.create({
        name: input.name,
        description: input.description,
        status: input.status
      });
    }

    const company = this.companyRepository.create({
      currency,
      headOffice,
      tenant,
      ...input
      // isGroup
    });

    await this.companyRepository.persistAndFlush(company);

    // console.log(company instanceof CustomBaseEntity);

    return company;
  }

  async update(input: UpdateCompanyInput) {
    const { id, ...rest } = input;
    console.log(input);

    const company = await this.companyRepository.findOneOrFail(
      { id },
      { populate: ["currency"] }
    );

    this.companyRepository.assign(company, rest);
    await this.companyRepository.flush();
    return company;
  }

  async remove(id: string) {
    const company = await this.companyRepository.findOneOrFail(
      { id },
      { populate: ["currency"] }
    );
    await this.companyRepository.removeAndFlush(company);

    return company;
  }
  //
  async findAll(params: { populate?: AutoPath<Company, string>[] }) {
    const { populate } = params;
    const companies = await this.companyRepository.findAll({
      // populate: ["currency", "tenant"],
      populate,
      strategy: LoadStrategy.JOINED
    });
    return companies;
  }

  async findAllByName(params: {
    name: string;
    populate?: AutoPath<Company, string>[];
  }) {
    const { name, populate } = params;
    const companies = await this.companyRepository.find(
      {
        name: { $ilike: `%${name}%` }
      },
      { populate }
    );
    return companies;
  }

  async findOne(params: {
    id: string;
    populate?: AutoPath<Company, string>[];
  }) {
    const { id, populate } = params;
    const company = await this.companyRepository.findOneOrFail(
      { id },
      { populate }
    );
    return company;
  }

  async findOneByName(params: {
    name: string;
    populate?: AutoPath<Company, string>[];
  }) {
    const { name, populate } = params;
    const company = await this.companyRepository.findOneOrFail(
      {
        name: { $eq: `${name}` }
      },
      { populate }
    );
    return company;
  }
}
