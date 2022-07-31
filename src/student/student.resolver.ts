import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Public } from "src/common";
import { StudentService } from "./student.service";
import { Student } from "./entities/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";

@Resolver(() => Student)
@Public()
export class StudentResolver {
  constructor(private readonly studentsService: StudentService) {}

  @Mutation(() => Student)
  createStudent(@Args("input") input: CreateStudentInput) {
    return this.studentsService.create(input);
  }

  @Query(() => [Student], { name: "students" })
  findAll() {
    return this.studentsService.findAll();
  }

  @Query(() => Student, { name: "student" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.studentsService.findOne(id);
  }

  // @Mutation(() => Student)
  // updateStudent(@Args("input") updateStudentInput: UpdateStudentInput) {
  //   return this.studentsService.update(
  //     updateStudentInput.id,
  //     updateStudentInput
  //   );
  // }

  // @Mutation(() => Student)
  // removeStudent(@Args("id", { type: () => Int }) id: number) {
  //   return this.studentsService.remove(id);
  // }
}
