import { User } from '../../domain/users';
import { UsersSchema } from '../entities/users.schema';

export class UsersMapper {
  static toPersistence(entity: User): UsersSchema {
    const schema = new UsersSchema();
    schema.id = entity.id;
    schema.name = entity.name;
    schema.email = entity.email;
    schema.password = entity.password;
    return schema;
  }

  static toDomain(schema: UsersSchema): User {
    const user = new User(schema.name, schema.email, schema.password);
    user.id = schema.id;
    user.createdAt = schema.createdAt;
    user.updatedAt = schema.updatedAt;
    user.deletedAt = schema.deletedAt;
    return user;
  }
}
