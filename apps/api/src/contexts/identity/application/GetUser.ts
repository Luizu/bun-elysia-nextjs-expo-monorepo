import { PrismaClient } from "@repo/database";

// In CQRS, Queries often bypass the Domain Model for performance (Read Model)
export class GetUser {
  constructor(private prisma: PrismaClient) {}

  async execute(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
      },
    });

    if (!user) throw new Error("User not found");
    return user;
  }
}
