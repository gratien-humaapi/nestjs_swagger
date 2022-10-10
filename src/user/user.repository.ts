import { EntityRepository } from "@mikro-orm/postgresql";
// eslint-disable-next-line import/no-cycle
import { User } from "./entities/user.entity";

export class UserRepository extends EntityRepository<User> {}
