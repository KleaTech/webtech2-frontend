export class CustomerModel {
  name: string;
  billingAddress: string;
  _id: string;
  constructor(name: string, billingAddress: string, _id: string) {
    this.name = name;
    this.billingAddress = billingAddress;
    this._id = _id;
  }
}
