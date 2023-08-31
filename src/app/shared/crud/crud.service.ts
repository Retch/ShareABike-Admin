import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Lock } from '../../types/Lock';



@Injectable({
  providedIn: 'root',
})
export class CrudService {
  endpoint = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) {}

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllLocks(): Observable<Lock> {
    return this.httpClient
      .get<Lock>(this.endpoint + '/admin/getall');
  }

}
