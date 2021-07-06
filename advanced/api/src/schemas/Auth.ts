import { Field, ObjectType } from "type-graphql";

import { IUser } from "../database/models/User";

import User from "./User";

interface IAuth {
  token: string;
  user: IUser;
}

@ObjectType()
class Auth implements IAuth {
  @Field({ nullable: false })
  token!: string;

  @Field(() => User, { nullable: false })
  user!: User;
}

export default Auth;
