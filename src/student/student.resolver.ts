import { Resolver, Query, Mutation, Args, Int, Info } from "@nestjs/graphql";
import { GqlValidationPipe, CurrentUser, Public } from "src/common";
import { ValidationPipe } from "@nestjs/common/pipes";
import { GraphQLResolveInfo } from "graphql/type";
import { ICurrentUser } from "src/auth";
import { UseGuards } from "@nestjs/common";
import { StudentService } from "./student.service";
import { Student } from "./entities/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { StudentArgs } from "./dto/student.args";

enum CacheScope {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Public = "PUBLIC",
  Private = "PRIVATE"
}

// @UseGuards(GraphqlJwtAuthGuard)
@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentsService: StudentService) {}

  @Mutation(() => Student)
  createStudent(
    @CurrentUser() user: ICurrentUser,
    @Args("input", new GqlValidationPipe())
    input: CreateStudentInput
  ) {
    // return null;
    // console.log({ user });

    return this.studentsService.create(input);
  }

  @Query(() => [Student], { name: "students" })
  findAll(@Info() info: GraphQLResolveInfo) {
    info.cacheControl.setCacheHint({ maxAge: 60, scope: CacheScope.Private });
    return this.studentsService.findAll();
  }

  @Query(() => Student, { name: "student" })
  findOne(@Args(new GqlValidationPipe()) args: StudentArgs) {
    return this.studentsService.findOne(args.id);
  }

  @Query(() => Student, { name: "test" })
  find(@Args("id", { type: () => Int }, new GqlValidationPipe()) id: number) {
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
