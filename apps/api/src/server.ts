import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { auth } from "@repo/auth";
import { userRoutes } from "./http/routes/user.routes";

const app = new Elysia()
  .use(cors())
  .group("/api", (app) =>
    app
      .mount(auth.handler)
      .use(userRoutes)
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
