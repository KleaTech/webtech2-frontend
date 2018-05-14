import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodModel } from './food.model';

@Injectable()
export class FoodService {
  private readonly URL = 'http://localhost:3000/food';

  constructor(
    protected httpClient: HttpClient,
  ) {}

  public listFood(): Observable<Array<FoodModel>> {
    return this.httpClient.get<Array<FoodModel>>(this.URL + '/listFoods');
  }

  public listDrink(): Observable<Array<FoodModel>> {
    return this.httpClient.get<Array<FoodModel>>(this.URL + '/listDrinks');
  }

  public add(food: FoodModel): Observable<string> {
    return this.httpClient.post(this.URL + '/add', food, {responseType : 'text'});
  }

  public remove(food: string): Observable<string> {
    return this.httpClient.get(this.URL + '/remove?id=' + food, {responseType : 'text'});
  }
}
