import { EntityRepository } from "@mikro-orm/postgresql";
// eslint-disable-next-line import/no-cycle
import { Session } from "../entities/session.entity";

export class SessionRepository extends EntityRepository<Session> {}
