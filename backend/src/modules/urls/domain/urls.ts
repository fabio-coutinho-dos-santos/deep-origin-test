export class Url {
  private _id?: number;
  private _hits: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date;
  constructor(
    private _original: string,
    private _shortened: string,
    private _userId: number,
  ) {
    this._hits = 0;
    this._createdAt = new Date();
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get original(): string {
    return this._original;
  }

  get shortened(): string {
    return this._shortened;
  }

  get hits(): number {
    return this._hits;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  set id(value: number) {
    this._id = value;
  }

  set hits(value: number) {
    this._hits = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  set deletedAt(value: Date) {
    this._deletedAt = value;
  }

  set userId(value: number) {
    this._userId = value;
  }
}
