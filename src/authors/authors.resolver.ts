import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthorsService } from "./authors.service";
import { Author } from "./models/author.model";
import { CreateAuthorInput } from "./dto/create-author.input";
import { UpdateAuthorInput } from "./dto/update-author.input";

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  createAuthor(@Args("input") createAuthorInput: CreateAuthorInput) {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: "authors", description: "test" })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: "author" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author)
  updateAuthor(@Args("input") updateAuthorInput: UpdateAuthorInput) {
    return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  }

  @Mutation(() => Author)
  removeAuthor(@Args("id", { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }
}
