export abstract class Entity<T> {
  protected readonly _id: string;
  protected _props: T;

  constructor(props: T, id?: string) {
    this._id = id || crypto.randomUUID();
    this._props = props;
  }

  get id() {
    return this._id;
  }

  get props() {
    return this._props;
  }
}
