import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Info,
  PartialType,
  ObjectType
} from "@nestjs/graphql";
import { GqlValidationPipe, CurrentUser, Public } from "src/common";
import { ValidationPipe } from "@nestjs/common/pipes";
import { GraphQLResolveInfo } from "graphql/type";
import { ICurrentUser } from "src/authentification";
import { UseGuards, UsePipes } from "@nestjs/common";
import { GraphQLUUID } from "graphql-scalars";
import { StudentService } from "./student.service";
import { Student } from "./entities/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { StudentArgs } from "./dto/student.args";
import { PartialStudent } from "./entities/student.entity copy";

// enum CacheScope {
//   // eslint-disable-next-line @typescript-eslint/no-shadow
//   Public = "PUBLIC",
//   Private = "PRIVATE"
// }

@UsePipes(GqlValidationPipe)
@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => PartialStudent)
  createStudent(
    @CurrentUser() user: ICurrentUser,
    @Args("input")
    input: CreateStudentInput
  ) {
    // return null;
    // console.log({ user });

    return this.studentService.create(input);
  }

  @Mutation(() => Student)
  updateStudent(@Args("input") input: UpdateStudentInput) {
    return this.studentService.update(input);
  }

  @Mutation(() => Student)
  removeStudent(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.studentService.remove(id);
  }
  @Query(() => [Student], { name: "students" })
  findAll() {
    return this.studentService.findAll();
  }

  @Query(() => Student, { name: "student" })
  findOne(@Args("id", { type: () => GraphQLUUID }) id: string) {
    return this.studentService.findOne(id);
  }
}
