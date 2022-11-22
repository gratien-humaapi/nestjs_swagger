import { LoadStrategy } from "@mikro-orm/core";
import { AutoPath } from "@mikro-orm/core/typings";
import { Injectable } from "@nestjs/common";
import { CommonStatusEnum, CustomBaseEntity } from "src/common";
import { CurrencyRepository } from "src/currency/currency.repository";
import { CompanyRepository } from "./company.repository";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanyService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly currencyRepository: CurrencyRepository
  ) {}

  async create(input: CreateCompanyInput) {
    const currency = await this.currencyRepository.findOneOrFail({
      id: input.currencyId
    });

    // const isGroup = (!input.isGroup && !input.headOfficeId) ?? input.isGroup;
    const headOffice = input.headOfficeId
      ? await this.findOne({ id: input.headOfficeId })
      : undefined;

    const company = this.companyRepository.create({
      // tenant: {
      //   status: input.status,
      //   name: input.name,
      //   description: input.description
      // },

      currency,
      headOffice,
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
    const company = await this.companyRepository.findOneOrFail({ id });
    await this.companyRepository.removeAndFlush(company);

    return company;
  }
  //
  async findAll() {
    const companies = await this.companyRepository.findAll({
      populate: ["currency"],
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
        name: { $like: `${name}%` }
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
