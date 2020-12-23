import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerEditModalComponent } from './modals/customer-edit-modal/customer-edit-modal.component';
import { EditJobItemComponent } from './modals/edit-job-item/edit-job-item.component';
import { AddJobItemComponent } from './modals/add-job-item/add-job-item.component';
import { AddInvoiceComponent } from './modals/add-invoice/add-invoice.component';
import { AddModalCustomerComponent } from './modals/add-modal-customer/add-modal-customer.component';


@NgModule({
  declarations: [
    CustomerHomeComponent,
    CustomerEditComponent,
    CustomerDeleteComponent,
    CustomerDetailComponent,
    CustomerAddComponent,
    CustomerEditModalComponent,
    EditJobItemComponent,
    AddJobItemComponent,
    AddInvoiceComponent,
    AddModalCustomerComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
