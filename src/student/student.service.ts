import { Injectable } from "@nestjs/common";
import { SessionService } from "src/authentification";
import { StudentRepository } from "./student.repository";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(input: CreateStudentInput) {
    const student = this.studentRepository.create({
      ...input
    });

    // eslint-disable-next-line max-len
    await this.studentRepository.persistAndFlush(student);
    return student;
  }

  async update(input: UpdateStudentInput) {
    const { id, ...rest } = input;

    // this.sessionService.testReq();

    const student = await this.studentRepository.findOneOrFail({ id });

    this.studentRepository.assign(student, rest);
    await this.studentRepository.flush();
    return student;
  }

  async remove(id: string) {
    const student = await this.studentRepository.findOneOrFail({ id });
    await this.studentRepository.removeAndFlush(student);

    return student;
  }

  async findAll() {
    const students = await this.studentRepository.findAll();
    return students;
  }

  async findOne(id: string) {
    const student = await this.studentRepository.findOneOrFail({ id });
    return student;
  }
}
