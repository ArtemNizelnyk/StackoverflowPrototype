import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import "reflect-metadata";
import { UserResolver } from "./resolvers/User";
import cors from 'cors';
import {createConnection} from 'typeorm';
import "reflect-metadata";

import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import { sendEmail } from "./utils/sendEmail";
import { User } from "./entities/user";
import { Post } from "./entities/Post";

const main = async () => {
  
const conn = await createConnection ({
  type: 'postgres',
  database: 'forumdb',
  username: 'postgres',
  password: "Password123456",
  logging:true,
  synchronize:true,
  entities: [Post, User],
})

//await Post.delete({});
 


  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
 
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10years
        httpOnly: true,
        sameSite: "lax", //csrf
        secure:false, //cookie works only in https
      },
      secret: "qowi",
      saveUninitialized: true,
      resave: false,
    })
  );

  const appoloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  appoloServer.applyMiddleware({
    app,
    cors: false,
  });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch(console.error);

console.log("Hello There!");
