import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ICustomer } from 'src/app/shared/Models/Customer';
import { CustomerParams } from 'src/app/shared/Models/customerParams';
import { Pagination } from 'src/app/shared/Models/pagination';
import { CustomersService } from '../customers.service';
import { CustomerEditModalComponent } from '../modals/customer-edit-modal/customer-edit-modal.component';

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
  bsModalRef: BsModalRef;

  constructor(private services: CustomersService, private modalService: BsModalService) {
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
  // tslint:disable-next-line:typedef
  openEditModal(customer: ICustomer) {
    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        customer
      }
    };
    this.bsModalRef = this.modalService.show(CustomerEditModalComponent, config);
    console.log(customer);
  }
}
