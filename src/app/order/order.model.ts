import {CustomerModel} from '../customer/customer.model';
import {BartenderModel} from '../bartender/bartender.model';
import {FoodModel} from '../food/food.model';

export class OrderModel {
  status: string;
  received: Date;
  _id: string;
  customer: CustomerModel;
  bartender: BartenderModel;
  foods: FoodModel[];
  fulfilled: Date;

  constructor(status: string, received: Date, id: string, customer: CustomerModel,
              bartender: BartenderModel, foods: FoodModel[], fulfilled: Date) {
    this.status = status;
    this.received = received;
    this._id = id;
    this.customer = customer;
    this.bartender = bartender;
    this.foods = foods;
    this.fulfilled = fulfilled;
  }
}
