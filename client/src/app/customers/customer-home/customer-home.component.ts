import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Customer, ICustomer } from 'src/app/shared/Models/Customer';
import { CustomerParams } from 'src/app/shared/Models/customerParams';
import { Pagination } from 'src/app/shared/Models/pagination';
import { CustomersService } from '../customers.service';
import { AddModalCustomerComponent } from '../modals/add-modal-customer/add-modal-customer.component';
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

  constructor(
    private services: CustomersService,
    private modalService: BsModalService,
    private toastr: ToastrService, ) {
    this.customerParams = this.services.getCustomerParams();
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
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

  addCustomerModal(): void {
    const customer =  new Customer();
    customer.customerName = 'Alberte Johns';
    customer.companyName = 'Newham Council';
    customer.address1 = '123 Barking Road';
    customer.address2 = 'East Ham';
    customer.address3 = 'London';
    customer.address4 = 'E6 2DF';
    customer.address5 = 'UK';
    customer.dateOfBirth = new Date(2006, 2, 20);

    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        customer
      }
    };
    this.bsModalRef = this.modalService.show(AddModalCustomerComponent, config);
    this.bsModalRef.content.saveCustomerEvent.subscribe(values => {
      console.log(values);
      this.services.addCustomer(values).subscribe((newCustomer: ICustomer) => {
        // this.customers.push(newCustomer);
        this.toastr.success('New customer saved');
        this.loadCustomers();
      });
    });
    console.log(customer);
  }
}
