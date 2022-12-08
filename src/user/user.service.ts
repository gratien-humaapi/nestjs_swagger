import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(input: CreateUserInput) {
    const user = this.userRepository.create({
      ...input
    });

    // eslint-disable-next-line max-len
    await this.userRepository.persistAndFlush(user);
    console.log({ user });
    return user;
  }

  async update(input: UpdateUserInput) {
    const { id, ...rest } = input;

    const user = await this.userRepository.findOneOrFail({ id });

    this.userRepository.assign(user, rest);
    await this.userRepository.flush();
    return user;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneOrFail({ id });
    await this.userRepository.removeAndFlush(user);

    return user;
  }

  /**
   * List all User
   */
  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  /**
   * Get User by ID
   */
  async findOne(id: string) {
    const user = await this.userRepository.findOneOrFail({ id });
    return user;
  }
}
