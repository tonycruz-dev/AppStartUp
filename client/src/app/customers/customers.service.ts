import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountsService } from '../accounts/accounts.service';
import { ICustomer } from '../shared/Models/Customer';
import { CustomerParams } from '../shared/Models/customerParams';
import { IJobItem } from '../shared/Models/JobItem';
import { PaginatedResult } from '../shared/Models/pagination';
import { getPaginatedResult, getPaginationHeaders } from '../shared/Models/paginationHelper';
import { IUser } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  customers: ICustomer[] = [];
  paginatedResult: PaginatedResult<ICustomer[]> = new PaginatedResult<ICustomer[]>();
  baseUrl = environment.apiUrl;
  customerCache = new Map();
  customerParams: CustomerParams;
  user: IUser;
  constructor(private http: HttpClient, private accountServices: AccountsService) {
    this.customerParams = new CustomerParams();
    this.accountServices.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });
  }

  // tslint:disable-next-line:typedef
  getCustomers(custParms: CustomerParams) {
    const response = this.customerCache.get(Object.values(custParms).join('-'));
    if (response) {
      return of(response);
    }
    let params = getPaginationHeaders(custParms.pageNumber, custParms.pageSize);
    // if (page !== null && itemPerPage !== null) {
    //   params.append('PageNumber', page.toString());
    //   params.append('PageSize', itemPerPage.toString());
    // }
    if (custParms.search == null) {
      custParms.search = '';
    }
    params = params.append('search', custParms.search);


    // params = params.append('gender', userParams.gender);
    // params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<ICustomer[]>( this.baseUrl + 'api/Customers/GetCustomerWithPagination', params, this.http)
    .pipe(map(result => {
      this.customerCache.set(Object.values(custParms).join('-'), result);
      return result;
    }));
  }
  // tslint:disable-next-line:typedef
  getCustomerParams() {
    return this.customerParams;
  }

  // tslint:disable-next-line:typedef
  setCustomerParams(params: CustomerParams) {
    this.customerParams = params;
  }

  // tslint:disable-next-line:typedef
  resetCustomerParams() {
    this.customerParams = new CustomerParams();
    return this.customerParams;
  }
  getCustomerById(id: number): Observable<ICustomer>  {
    // const findCustomer = [...this.customerCache.values()]
    // .reduce((arr, elem) => arr.concat(elem.result), [])
    // .find((customer: ICustomer) => customer.id === id);

    // if (findCustomer) {
    //   return of(findCustomer);
    // }
    return this.http.get<ICustomer>(this.baseUrl + `api/Customers/GetCustomersById/${id}`);
  }
  UpdateJobItem(jobItem: IJobItem): Observable<IJobItem> {
     return this.http.put<IJobItem>(this.baseUrl + 'api/Customers/UpdateJobItem', jobItem);
  }
  addJobItem(jobItem: IJobItem): Observable<IJobItem> {
    return this.http.post<IJobItem>(this.baseUrl + 'api/Customers/AddJobItem', jobItem);
 }
  updateCustomer(customer: ICustomer): Observable<void> {
      return this.http.put(this.baseUrl + 'api/Customers/UpdateCustomer', customer)
      .pipe(map(() => {
        const index = this.paginatedResult.result.indexOf(customer);
        this.paginatedResult.result[index] = customer;
      })
      );
  }


}
