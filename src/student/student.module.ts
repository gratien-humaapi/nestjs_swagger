import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { StudentService } from "./student.service";
import { StudentResolver } from "./student.resolver";
import { Student } from "./entities/student.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Student])],
  providers: [StudentResolver, StudentService]
})
export class StudentModule {}
