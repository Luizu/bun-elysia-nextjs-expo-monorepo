import { Entity } from "../../../core/domain/Entity";

interface UserProps {
  email: string;
  name: string;
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }
  
  changeName(newName: string) {
    if (newName.length < 3) throw new Error("Name too short");
    this.props.name = newName;
  }
}
