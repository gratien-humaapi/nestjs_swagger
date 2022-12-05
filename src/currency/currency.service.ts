import { Injectable } from "@nestjs/common";
import { ApolloError } from "apollo-server-express";
import { WithCurrentUser } from "src/common";
import { CurrencyRepository } from "./currency.repository";
import { CreateCurrencyInput } from "./dto/create-currency.input";
import { UpdateCurrencyInput } from "./dto/update-currency.input";

@Injectable()
export class CurrencyService {
  constructor(private readonly currencyRepository: CurrencyRepository) {}

  async create(input: Omit<WithCurrentUser<CreateCurrencyInput>, "role">) {
    try {
      const currency = this.currencyRepository.create({
        ...input
      });
      console.log(currency);

      // eslint-disable-next-line max-len
      await this.currencyRepository.persistAndFlush(currency);
      return currency;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async findAll(currentUser: WithCurrentUser) {
    try {
      const currencies = await this.currencyRepository.find(
        {}
        // {
        //   filters: { currentUser }
        // }
      );

      return currencies;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  /**
   * Get Currency by code
   */
  async findAllByCode(code: string) {
    const currencies = await this.currencyRepository.find({
      code: { $ilike: `%${code}%` }
    });
    return currencies;
  }

  /**
   * Get Currency by ID
   */
  async findOne(id: string) {
    try {
      const currency = await this.currencyRepository.findOne({ id });
      return currency;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async update(input: UpdateCurrencyInput) {
    const { id, ...rest } = input;
    try {
      const currency = await this.currencyRepository.findOneOrFail({ id });
      this.currencyRepository.assign(currency, rest);
      await this.currencyRepository.flush();
      return currency;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async remove(id: string) {
    try {
      const currency = await this.currencyRepository.findOneOrFail({ id });
      await this.currencyRepository.removeAndFlush(currency);

      return currency;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("operation failed");
    }
  }

  async findOneByCode(name: string) {
    const currency = await this.currencyRepository.findOneOrFail({
      code: { $eq: `${name}` }
    });
    return currency;
  }
}
