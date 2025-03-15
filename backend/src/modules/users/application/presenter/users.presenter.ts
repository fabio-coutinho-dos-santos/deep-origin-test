import { User } from '../../domain/users';

export class UsersPresenter {
  static presentOne(data: User) {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
    };
  }
  static presentAll(data: User[]) {
    return data.map((user) => this.presentOne(user));
  }
}
