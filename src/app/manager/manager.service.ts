import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ManagerService {
  private readonly URL = 'http://localhost:3000/manager';

  constructor(
    protected httpClient: HttpClient,
  ) {}

  public orderStatistics(): Observable<Array<number>> {
    return this.httpClient.get<Array<number>>(this.URL + '/orderStatistics');
  }

  public foodStatistics(): Observable<Array<Array<any>>> {
    return this.httpClient.get<Array<Array<any>>>(this.URL + '/foodStatistics');
  }
}
