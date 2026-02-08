import { Elysia } from "elysia";
import { auth } from "@repo/auth";

const app = new Elysia()
  .group("/api", (app) =>
    app
      .mount(auth.handler)
      .get("/health", () => ({ status: "ok" }))
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
