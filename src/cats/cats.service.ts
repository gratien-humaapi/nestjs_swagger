import { Injectable } from "@nestjs/common";
import { Cat } from "src/cats/cat.interface";

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number) {
    return this.cats[id];
  }
}
