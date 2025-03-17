import { User } from './users';

describe('User Domain Model', () => {
  it('should create a valid user', () => {
    const user = new User('John Doe', 'john.doe@example.com', 'securePass');
    expect(user).toBeDefined();
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('john.doe@example.com');
    expect(user.password).toBe('securePass');
  });

  it('should throw an error if name is empty', () => {
    expect(() => new User('', 'john.doe@example.com', 'securePass')).toThrow();
  });

  it('should throw an error if email is invalid', () => {
    expect(() => new User('John Doe', 'invalid-email', 'securePass')).toThrow();
  });

  it('should throw an error if password is less than 5 characters', () => {
    expect(() => new User('John Doe', 'john.doe@example.com', '123')).toThrow();
  });

  it('should update name and still be valid', () => {
    const user = new User('John Doe', 'john.doe@example.com', 'securePass');
    user.name = 'Jane Doe';
    expect(user.name).toBe('Jane Doe');
  });

  it('should throw an error when updating email to an invalid one', () => {
    const user = new User('John Doe', 'john.doe@example.com', 'securePass');
    expect(() => (user.email = 'invalid-email')).toThrow();
  });

  it('should throw an error when updating password to less than 5 characters', () => {
    const user = new User('John Doe', 'john.doe@example.com', 'securePass');
    expect(() => (user.password = '123')).toThrow();
  });
});
