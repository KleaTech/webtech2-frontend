export class FoodModel {
  _id: string;
  name: string;
  price: number;
  ingredients: string[];
  type: string;

  constructor(id: string, name: string, price: number, ingredients: string[], type: string) {
    this._id = id;
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
    this.type = type;
  }
}
