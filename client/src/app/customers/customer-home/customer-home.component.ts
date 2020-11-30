import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/shared/Models/Customer';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  customers: ICustomer[];
  isLoading = false;
  constructor(private services: CustomersService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.services.getCustomers().subscribe(response => {
       this.customers =  response;
       this.isLoading = false;
    });
  }
  searchHomes(): void {

  }
}
