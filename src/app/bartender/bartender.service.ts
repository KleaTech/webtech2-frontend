import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BartenderModel } from './bartender.model';

@Injectable()
export class BartenderService {
  private readonly URL = 'http://localhost:3000/bartender';

  constructor(
    protected httpClient: HttpClient,
  ) {}

  public list(): Observable<Array<BartenderModel>> {
    return this.httpClient.get<Array<BartenderModel>>(this.URL + '/list');
  }

  public add(bartender: BartenderModel): Observable<string> {
    return this.httpClient.post(this.URL + '/add', bartender, {responseType : 'text'});
  }

  public remove(bartender: BartenderModel): Observable<string> {
    return this.httpClient.post(this.URL + '/remove', bartender, {responseType : 'text'});
  }
}
