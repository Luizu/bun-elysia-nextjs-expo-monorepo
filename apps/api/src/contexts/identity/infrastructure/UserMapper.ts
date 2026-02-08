import { User as PrismaUser } from "@prisma/client";
import { User } from "../domain/User";

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name || "",
      },
      raw.id
    );
  }

  static toPersistence(user: User): Partial<PrismaUser> {
    return {
      id: user.id, // Getter accessor needed in Entity
      name: user.props.name,
      email: user.props.email,
    };
  }
}
