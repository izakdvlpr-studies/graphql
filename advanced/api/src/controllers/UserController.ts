import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { hash } from "bcryptjs";

import MongoUser from "../database/models/User";
import User from "../schemas/User";

@Resolver(User)
class UserController {
  @Query(() => [User], { name: "users" })
  async find() {
    const users = await MongoUser.find().select([
      "_id",
      "name",
      "email",
      "createdAt",
      "updatedAt",
    ]);

    return users;
  }

  @Query(() => User, { name: "user" })
  async findById(@Arg("id") id: string) {
    const user = await MongoUser.findById(id);

    if (!user) {
      throw new Error("User does not exists");
    }

    return user;
  }

  @Mutation(() => User, { name: "createUser" })
  async create(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 8);

    const user = await MongoUser.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UserController;
