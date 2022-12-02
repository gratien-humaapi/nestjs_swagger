import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";
import { CreateIndustryInput } from "./dto/create-industry.input";
import { IndustryRepository } from "./industry.repository";

@Injectable()
export class IndustryService {
  constructor(private readonly industryRepository: IndustryRepository) {}

  async createIndustry(input: CreateIndustryInput) {
    try {
      const industry = this.industryRepository.create({ ...input });
      await this.industryRepository.persistAndFlush(industry);
      return industry;
    } catch (error) {
      console.log({ error });
      throw new ApolloError("operation failed");
    }
  }

  async getIndustries() {
    try {
      const industries = await this.industryRepository.findAll({});
      return industries;
    } catch (error) {
      console.log({ error });
      throw new ApolloError("operation failed");
    }
  }

  async getIndustryByName(name: string) {
    try {
      const industries = await this.industryRepository.find({
        name: { $ilike: `%${name}%` }
      });
      console.log(industries);

      return industries;
    } catch (error) {
      console.log({ error });
      throw new ApolloError("operation failed");
    }
  }
}
