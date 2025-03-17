import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

export class User {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date;

  @IsNotEmpty()
  @IsString()
  private _name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  private _email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  private _password: string;

  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;

    this.validate();
  }

  private validate() {
    const errors = validateSync(this);
    if (errors.length > 0) {
      throw new Error(JSON.stringify(errors));
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
    this.validate();
  }

  set email(email: string) {
    this._email = email;
    this.validate();
  }

  set password(password: string) {
    this._password = password;
    this.validate();
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
