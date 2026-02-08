import { UserRepository } from "../domain/UserRepository";

export class ChangeUserName {
  constructor(private userRepo: UserRepository) {}

  async execute(userId: string, newName: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    user.changeName(newName);

    await this.userRepo.save(user);
    return { id: user.id, name: user.props.name };
  }
}
