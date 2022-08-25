import { ICurrentUser } from "src/auth";

export type WithCurrentUser<T = undefined> = T extends undefined
  ? ICurrentUser
  : T & ICurrentUser;
