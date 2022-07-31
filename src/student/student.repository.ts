import { EntityRepository } from "@mikro-orm/postgresql";
// eslint-disable-next-line import/no-cycle
import { Student } from "./entities/student.entity";

export class StudentRepository extends EntityRepository<Student> {}
