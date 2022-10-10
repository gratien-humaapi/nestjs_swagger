export type NonNullable<T> = Exclude<T, null | undefined>;
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
