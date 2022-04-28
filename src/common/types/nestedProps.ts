/**
 *  @see https://gist.github.com/staltz/368866ea6b8a167fbdac58cddf79c1bf?permalink_comment_id=3805194#gistcomment-3805194
 * @see https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
 * @see https://steveholgado.com/typescript-types-from-arrays/
 */

/**
 *  not implemented yet @see https://github.com/microsoft/TypeScript/issues/34933
 */
// export type NestedKeyOf<DynamicValue extends object | readonly any[]> = {
//   [Key in keyof DynamicValue &
//     (string | number)]: DynamicValue[Key] extends object
//     ? `${Key}` | `${Key}.${NestedKeyOf<DynamicValue[Key]>}`
//     : DynamicValue extends any[]
//     ? `${DynamicValue[number]}`
//     : `${Key}`;
// }[keyof DynamicValue & (string | number)];

export type NestedKeyOf<DynamicValue extends object | readonly any[]> = {
  [Key in keyof DynamicValue &
    (string | number)]: DynamicValue[Key] extends any[]
    ? `${Key}`
    : DynamicValue[Key] extends object
    ? `${Key}.${NestedKeyOf2<DynamicValue[Key]>}`
    : `${Key}`;
}[keyof DynamicValue & (string | number)];

type NestedKeyOf2<DynamicValue extends object | readonly any[]> = {
  [Key in keyof DynamicValue &
    (string | number)]: DynamicValue[Key] extends any[]
    ? `${Key}`
    : DynamicValue[Key] extends object
    ? `${Key}.${NestedKeyOf3<DynamicValue[Key]>}`
    : `${Key}`;
}[keyof DynamicValue & (string | number)];

type NestedKeyOf3<DynamicValue extends object | readonly any[]> = {
  [Key in keyof DynamicValue &
    (string | number)]: DynamicValue[Key] extends any[]
    ? `${Key}`
    : DynamicValue[Key] extends object
    ? `${Key}.${NestedKeyOf4<DynamicValue[Key]>}`
    : `${Key}`;
}[keyof DynamicValue & (string | number)];

type NestedKeyOf4<DynamicValue extends object | readonly any[]> = {
  [Key in keyof DynamicValue &
    (string | number)]: DynamicValue[Key] extends any[]
    ? `${Key}`
    : DynamicValue[Key] extends object
    ? `${Key}.${NestedKeyOf5<DynamicValue[Key]>}`
    : `${Key}`;
}[keyof DynamicValue & (string | number)];

type NestedKeyOf5<DynamicValue extends object | readonly any[]> = {
  [Key in keyof DynamicValue & (string | number)]: `${Key}`;
}[keyof DynamicValue & (string | number)];

// export const flattenObj = <T extends Record<string, any>>(
//   obj: T,
//   parent?: string,
//   res = {} as any,
//   index = 0
// ): NestedKeyOf<T> => {
//   index += 1;
//   if (index > 5) {
//     throw "object is too deep, maximum authorized level is 6";
//   }
//   for (const key of Object.keys(obj)) {
//     const propName = parent ? parent + "." + key : key;
//     if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
//       flattenObj(obj[key], propName, res, index);
//     } else {
//       res[propName] = obj[key];
//     }
//   }
//   return res;
// };

/** Union of primitives to skip with deep omit utilities. */
type Primitive = string | number | boolean | undefined | null;
/** Variable Kind */
type VariableKind = string | number | boolean | any[];

/**
 *  @see https://gist.github.com/ahuggins-nhs/826906a58e4c1e59306bc0792e7826d1
 */

/** Deeply omit members of an array of interface or array of type. */
export type DeepOmitArray<T extends object[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
      // extra level of indirection needed to trigger homomorhic behavior // distribute over unions
      [P in Exclude<keyof T, K>]: T[P] extends infer TP
        ? TP extends Primitive[]
          ? TP
          : TP extends object[]
          ? DeepOmitArray<TP, K>
          : TP extends Primitive
          ? TP // leave primitives and functions alone
          : DeepOmit<TP, K>
        : never;
    };

export type DeepOmitVariableKind<T, U extends VariableKind> = {
  [P in Exclude<keyof T, GetKeyKind<T, U>>]: T[P] extends infer TP
    ? TP extends object
      ? DeepOmitVariableKind<TP, U>
      : TP
    : never;
};

type GetKeyKind<T, U extends VariableKind> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];
type XYZ = { x: number; y: string; z: boolean; k: { a: number } };
type T3a = Exclude<keyof XYZ, "k.a">;

const kk = {
  aa: 12,
  bb: "machin",
  cc: true,
  dd: { astring: "", bnumber: 12, cobject: { aa: 12, cc: "" } }
};

// const tt:NestedKeyOf<DeepOmitVariableKind<typeof kk, number>>= ''

export type DeepNonNullable<T> = T extends Primitive
  ? T
  : {
      // extra level of indirection needed to trigger homomorhic behavior // distribute over unions
      [P in keyof T]: T[P] extends infer TP
        ? TP extends object
          ? DeepNonNullable<TP> // leave primitives and functions alone
          : NonNullable<TP>
        : never;
    };

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// const Requiredall: DeepNonNullable<UserTest>;

/**
 *  below is a test for NestedKeyOf
 */
// const testK = {
//   name: 12,
//   text: 'ZEZRER',
//   arrayProp: ['EERER'],
//   objProp: {
//     univers: 10000,
//     planet: 'dfdfd',
//     satelites: ['kepler', 'weber'],
//     blackHole: {
//       densities: [1212, 'fdfdfffd'],
//       hover: 'fdfd',
//       futur: {
//         new: { a: 'jxhjh' },
//         newArr: [
//           { test: 12, testobj: { arr: [12], objTest: { test: 'fdffdF' } } }
//         ]
//       }
//     }
//   }
// };

// const keyTest: NestedKeyOf<typeof testK> = '';
