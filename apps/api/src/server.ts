import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { auth } from "@repo/auth";

const app = new Elysia()
  .use(cors()) // Enable CORS for Web/Mobile
  .group("/api", (app) =>
    app
      .mount(auth.handler) // Better Auth Routes
      .get("/me", async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers });
        if (!session) return { error: "Unauthorized" };
        return { user: session.user };
      })
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
