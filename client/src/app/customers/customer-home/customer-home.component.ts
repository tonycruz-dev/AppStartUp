import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/shared/Models/Customer';
import { CustomerParams } from 'src/app/shared/Models/customerParams';
import { Pagination } from 'src/app/shared/Models/pagination';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  customers: ICustomer[];
  pagination: Pagination;
  searchtxt: string;
  customerParams: CustomerParams;
  pageNumber = 1;
  pageSize = 5;

  constructor(private services: CustomersService) {
    this.customerParams = this.services.getCustomerParams();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }
  // tslint:disable-next-line:typedef
  loadCustomers() {
    this.services.getCustomers(this.customerParams).subscribe(response => {
      this.customers =  response.result;
      this.pagination = response.pagination;
   });
  }
  searchHomes(): void {
    this.loadCustomers();
  }
  // tslint:disable-next-line:typedef
  pageChanged(event: any) {
     this.customerParams.pageNumber = event.page;
   // this.service.setUserParams(this.userParams);
     this.loadCustomers();
  }
}
