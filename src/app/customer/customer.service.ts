import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from './customer.model';

@Injectable()
export class CustomerService {
  private readonly URL = 'http://localhost:3000/customer';

  constructor(
    protected httpClient: HttpClient,
  ) {}

  public list(): Observable<Array<CustomerModel>> {
    return this.httpClient.get<Array<CustomerModel>>(this.URL + '/list');
  }

  public add(customer: CustomerModel): Observable<string> {
    return this.httpClient.post(this.URL + '/add', customer, {responseType : 'text'});
  }

  public remove(customer: CustomerModel): Observable<string> {
    return this.httpClient.post(this.URL + '/remove', customer, {responseType : 'text'});
  }
}
