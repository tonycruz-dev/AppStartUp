import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CustomerHomeComponent, CustomerEditComponent, CustomerDeleteComponent, CustomerDetailComponent, CustomerAddComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
