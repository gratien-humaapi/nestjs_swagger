/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Entity,
  EntityRepositoryType,
  Filter,
  OptionalProps,
  PrimaryKey,
  Property
} from "@mikro-orm/core";
import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { GraphQLUUID } from "graphql-scalars";
import { v4 } from "uuid";

// https://taxsummaries.pwc.com/glossary/currency-codes

export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@InputType({ isAbstract: true }) // needed for Maped type when using jest e2e @see https://stackoverflow.com/questions/59527847/input-object-type-typename-must-define-one-or-more-fields
@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
// @Filter({
//   name: "currentUser",
//   cond: ({ company, owner, tenant }) => (
//     // eslint-disable-next-line no-sequences
//     console.log("here", company, owner, tenant),
//     {
//       // company: { $eq: company },
//       // owner: { $eq: owner }
//       // tenant: {
//       //   parentId: { $eq: "38095910-e6a0-451a-b5fe-f906213aada6" },
//       //   $eq: "38095910-e6a0-451a-b5fe-f906213aada6"
//       // }
//       $or: [
//         {
//           tenant: { parentId: { $eq: "75b6d68a-4147-421f-ab30-61827b0a11ec" } }
//         },
//         {
//           $or: [
//             {
//               tenant: { $eq: "75b6d68a-4147-421f-ab30-61827b0a11ec" }
//             }
//           ]
//         }
//       ]
//     }
//   ),
//   default: true
// })
export abstract class CustomBaseEntity<Repository, T extends string = "">
  implements IBaseEntity
{
  [EntityRepositoryType]?: Repository;
  [OptionalProps]?: T | "createdAt" | "updatedAt";
  @Field(() => GraphQLUUID)
  @PrimaryKey({ type: "uuid", onCreate: () => v4() })
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
