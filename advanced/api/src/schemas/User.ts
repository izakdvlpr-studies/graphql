import { Field, ID, ObjectType } from "type-graphql";

import { IUser } from "../database/models/User";

@ObjectType()
class User implements IUser {
  @Field(() => ID, { nullable: true })
  _id: any;

  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  password!: string;

  @Field({ nullable: true })
  createdAt!: Date;

  @Field({ nullable: true })
  updatedAt!: Date;
}

export default User;
