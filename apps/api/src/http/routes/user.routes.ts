import { Elysia, t } from "elysia";
import { PrismaClient } from "@repo/database";
import { PrismaUserRepository } from "../contexts/identity/infrastructure/PrismaUserRepository";
import { ChangeUserName } from "../contexts/identity/application/ChangeUserName";
import { GetUser } from "../contexts/identity/application/GetUser";
import { auth } from "@repo/auth";

const prisma = new PrismaClient();
const userRepo = new PrismaUserRepository(prisma);

// Command/Query instantiation (Dependency Injection)
const changeNameCommand = new ChangeUserName(userRepo);
const getUserQuery = new GetUser(prisma);

export const userRoutes = new Elysia({ prefix: "/users" })
  .use(auth.plugin) // Ensure auth context is available
  .get("/me", async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) throw new Error("Unauthorized");
    return getUserQuery.execute(session.user.id);
  })
  .patch(
    "/me/name",
    async ({ body, request }) => {
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session) throw new Error("Unauthorized");
      
      return changeNameCommand.execute(session.user.id, body.name);
    },
    {
      body: t.Object({
        name: t.String({ minLength: 3 }),
      }),
    }
  );
