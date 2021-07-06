import { buildSchemaSync } from "type-graphql";

import Tweet from "./Tweet";
import User from "./User";
import Auth from "./Auth";

import TweetController from "../controllers/TweetController";
import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";

import AuthenticationAssurance from "../middlewares/AuthenticationAssurance";

const schema = buildSchemaSync({
  resolvers: [
    Tweet,
    User,
    Auth,
    TweetController,
    UserController,
    SessionController,
  ],
  authChecker: AuthenticationAssurance,
});

export default schema;
