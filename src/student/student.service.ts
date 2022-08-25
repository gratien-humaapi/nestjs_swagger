import { Injectable } from "@nestjs/common";
import { ApolloError, UserInputError } from "apollo-server-express";
import { validate } from "class-validator";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { StudentRepository } from "./student.repository";

@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async create(input: CreateStudentInput) {
    try {
      const student = this.studentRepository.create(input);
      // const tt = new UserInputError();

      await this.studentRepository.persistAndFlush(student);
      return student;
    } catch (error) {
      console.log({ ...error, message: error.message });
      throw new ApolloError("internal server error");
    }
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
