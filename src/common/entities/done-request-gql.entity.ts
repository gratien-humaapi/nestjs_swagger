import { Entity } from "@mikro-orm/core";

@Entity({ abstract: true })
export class DoneRequest {
  done: boolean;
}
