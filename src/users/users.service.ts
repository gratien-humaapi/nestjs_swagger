/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import { wait } from "src/common/utils";

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: "john",
      password: "changeme"
    },
    {
      userId: 2,
      username: "maria",
      password: "guess"
    }
  ];

  async findOne(username: string) {
    await wait(300);
    const user = this.users.find((value) => value.username === username);
    return user;
  }
}
