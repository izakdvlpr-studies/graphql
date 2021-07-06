import { Arg, Mutation, Resolver } from "type-graphql";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import AuthConfig from "../config/auth";
import MongoUser from "../database/models/User";
import Auth from "../schemas/Auth";

@Resolver(Auth)
class AuthController {
  @Mutation(() => Auth)
  async signIn(@Arg("email") email: string, @Arg("password") password: string) {
    const user = await MongoUser.findOne({
      email,
    });

    if (!user) {
      throw new Error("Incorrect email/password combination.");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/password combination.");
    }

    const { secret, expiresIn } = AuthConfig.jwt;

    const token = sign({}, String(secret), {
      subject: `"${user._id}"`,
      expiresIn,
    });

    return {
      token,
      user,
    };
  }
}

export default AuthController;
