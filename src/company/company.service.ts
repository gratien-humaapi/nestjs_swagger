import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "./company.repository";
import { CreateCompanyInput } from "./dto/create-company.input";
import { UpdateCompanyInput } from "./dto/update-company.input";

@Injectable()
export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(input: CreateCompanyInput) {
    const company = this.companyRepository.create({
      ...input
    });

    // eslint-disable-next-line max-len
    await this.companyRepository.persistAndFlush(company);
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
    return company;
  }
}
