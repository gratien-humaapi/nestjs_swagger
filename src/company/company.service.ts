import { Injectable } from "@nestjs/common";
import { CommonStatusEnum } from "src/common";
import { CurrencyRepository } from "src/currency/currency.repository";
import { CompanyRepository } from "./company.repository";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";

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

    const company = this.companyRepository.create({
      // tenant: {
      //   status: input.status,
      //   name: input.name,
      //   description: input.description
      // },
      currency,
      ...input
    });

    await this.companyRepository.persistAndFlush(company);

    console.log(company);

    return company;
  }

  async update(input: UpdateCompanyInput) {
    const { id, ...rest } = input;

    const company = await this.companyRepository.findOneOrFail({ id });

    this.companyRepository.assign(company, rest);
    await this.companyRepository.flush();
    return company;
  }

  async remove(id: string) {
    const company = await this.companyRepository.findOneOrFail({ id });
    await this.companyRepository.removeAndFlush(company);

    return company;
  }

  async findAll() {
    const companies = await this.companyRepository.findAll();
    return companies;
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOneOrFail({ id });
    console.log(company);

    return company;
  }
}
