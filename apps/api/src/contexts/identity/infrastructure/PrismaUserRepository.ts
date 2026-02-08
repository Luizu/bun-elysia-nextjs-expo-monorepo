import { PrismaClient } from "@repo/database";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { UserMapper } from "./UserMapper";

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const raw = await this.prisma.user.findUnique({ where: { id } });
    if (!raw) return null;
    return UserMapper.toDomain(raw);
  }

  async save(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        // email is usually immutable in this context or handled separately
      },
    });
  }
}
