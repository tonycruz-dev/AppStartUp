import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICustomer } from '../shared/Models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: ICustomer[] = [];
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>( this.baseUrl + 'api/Customers/GetCustomers')
    .pipe(
      map(response => {
        this.customers = response;
        return this.customers;
      })
    );
  }

}
