import { ICurrentUser } from "src/authentification";

export type WithCurrentUser<T = undefined> = T extends undefined
  ? ICurrentUser
  : T & ICurrentUser;
