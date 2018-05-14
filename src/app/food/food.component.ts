import { Component, OnInit } from '@angular/core';
import {FoodModel} from './food.model';
import {FoodService} from './food.service';
import {OrderModel} from '../order/order.model';
import {CustomerService} from '../customer/customer.service';
import {BartenderService} from '../bartender/bartender.service';
import {CustomerModel} from '../customer/customer.model';
import {BartenderModel} from '../bartender/bartender.model';
import {OrderService} from '../order/order.service';

@Component({
  selector: 'app-food',
  providers: [FoodService, CustomerService, BartenderService, OrderService],
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  errorMessage: string;
  foods: FoodModel[];
  drinks: FoodModel[];

  finalizing = false;
  disableFinalizing = true;
  order: OrderModel = new OrderModel('received', null, null, null, null, [], null);

  addingFood = false;
  foodName: string;
  foodPrice: number;
  foodIngredients: string;

  addingDrink = false;
  drinkName: string;
  drinkPrice: number;
  drinkIngredients: string;

  customers: CustomerModel[];
  bartenders: BartenderModel[];

  constructor(
    private foodService: FoodService,
    private customerService: CustomerService,
    private bartenderService: BartenderService,
    private orderService: OrderService) { }

  getFoods() {
    this.foodService.listFood().subscribe(
      foods => this.foods = foods.filter(f => f.name.indexOf('DELETED') < 0),
      error => this.errorMessage = error
    );
  }

  getDrinks() {
    this.foodService.listDrink().subscribe(
      drinks => this.drinks = drinks.filter(f => f.name.indexOf('DELETED') < 0),
      error => this.errorMessage = error
    );
  }

  addFood(food: FoodModel) {
    this.foodService.add(food).subscribe(
      response => {
        this.getFoods();
        this.getDrinks();
      },
      error => this.errorMessage = error
    );
  }

  onFoodAddClicked() {
    if (this.foodIngredients == null) {
      this.addFood(new FoodModel(null, this.foodName, this.foodPrice, null, 'food'));
    } else {
      this.addFood(new FoodModel(null, this.foodName, this.foodPrice, this.foodIngredients.trim().split(','), 'food'));
    }
    this.foodName = null;
    this.foodPrice = null;
    this.foodIngredients = null;
    this.addingFood = false;
  }

  onDrinkAddClicked() {
    if (this.drinkIngredients == null) {
      this.addFood(new FoodModel(null, this.drinkName, this.drinkPrice, null, 'drink'));
    } else {
      this.addFood(new FoodModel(null, this.drinkName, this.drinkPrice, this.drinkIngredients.trim().split(','), 'drink'));
    }
    this.drinkName = null;
    this.drinkPrice = null;
    this.drinkIngredients = null;
    this.addingDrink = false;
  }

  onDeleteClicked(food: string) {
    this.foodService.remove(food).subscribe(
      response => {
        this.getFoods();
        this.getDrinks();
      },
      error => this.errorMessage = error
    );
  }

  onBasketClicked(food: FoodModel) {
    this.order.foods.push(food);
    this.disableFinalizing = false;
  }

  onRemoveFromOrderClicked(food: FoodModel) {
    this.order.foods = this.order.foods.filter(obj => obj !== food);
    if (this.order.foods.length === 0) {
      this.disableFinalizing = true;
      this.finalizing = false;
    }
  }

  getCustomersAndBartenders() {
    this.customerService.list().subscribe(
      customers => this.customers = customers,
      error => this.errorMessage = error
    );
    this.bartenderService.list().subscribe(
      bartenders => this.bartenders = bartenders,
      error => this.errorMessage = error
    );
  }

  onOrderClicked() {
    this.order.received = new Date();
    this.orderService.makeOrder(this.order).subscribe(
      response => {
        this.finalizing = false;
        this.disableFinalizing = true;
        this.order = new OrderModel('received', null, null, null, null, [], null);
      },
      error => this.errorMessage = error
    );
  }

  ngOnInit() {
    this.getFoods();
    this.getDrinks();
    this.getCustomersAndBartenders();
  }

}
