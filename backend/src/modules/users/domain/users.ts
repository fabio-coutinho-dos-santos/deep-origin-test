export class User {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date;

  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
  ) {
    this.validate();
  }

  validate() {
    if (!this._name || !this._email || !this._password) {
      throw new Error('Invalid user data');
    }
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get deletedAt() {
    return this._deletedAt;
  }

  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set password(password: string) {
    this._password = password;
  }

  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  set deletedAt(deletedAt: Date) {
    this._deletedAt = deletedAt;
  }
}
