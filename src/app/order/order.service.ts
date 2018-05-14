import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from './order.model';

@Injectable()
export class OrderService {
  private readonly URL = 'http://localhost:3000/order';

  constructor(
    protected httpClient: HttpClient,
  ) {}

  public list(customer: string): Observable<Array<OrderModel>> {
    return this.httpClient.get<Array<OrderModel>>(this.URL + '/listForCustomer?customer=' + customer);
  }

  public listForBartender(bartender: string): Observable<Array<OrderModel>> {
    return this.httpClient.get<Array<OrderModel>>(this.URL + '/listForBartender?bartender=' + bartender);
  }

  public fulfill(order: string): Observable<string> {
    return this.httpClient.get(this.URL + '/fulfill?id=' + order, {responseType: 'text'});
  }

  public makeOrder(order: OrderModel) {
    return this.httpClient.post(this.URL + '/add', order, {responseType: 'text'});
  }

  public listAll(status: string) {
    return this.httpClient.get<Array<OrderModel>>(this.URL + '/list?status=' + status);
  }
}
