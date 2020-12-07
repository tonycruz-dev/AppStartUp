import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Customer, ICustomer } from './../../shared/Models/Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('customersTabs', {static: true}) customersTabs: TabsetComponent;
  customerEdit = new Customer() ;
  customer: ICustomer;
  isOpenFrom = false;
  activeTab: TabDirective;

  // tslint:disable-next-line:typedef
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private customerServices: CustomersService) { }

  ngOnInit(): void {
   this.loadCustomer();

  }

  loadCustomer(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.customerServices
    .getCustomerById(id)
    .subscribe(response => {
      this.customer = response;
      console.log(this.customer);
      this.customer.dateOfBirth = new Date(this.customer.dateOfBirth);
      this.customerEdit = response;
    });
  }

  updateCustomers(): void {
    this.customerServices.updateCustomer(this.customer).subscribe(() => {
      this.toastr.success('Customer was updated successfully');
      this.editForm.reset(this.customer);
    });
  }
  selectTab(tabId: number): void {
    this.customersTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective): void {
    this.activeTab = data;
    // if (this.activeTab.heading === 'Messages' && this.customer.length === 0) {

    // } else {
    //  // this.messageService.stopHubConnection();
    // }
  }

}
