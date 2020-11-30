import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerDeleteComponent } from './customer-delete/customer-delete.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';

const routes: Routes = [
  {path: '', component: CustomerHomeComponent},
  { path: 'editcustomer/:id', component: CustomerEditComponent },
  { path: 'detailcustomer/:id', component: CustomerDetailComponent },
  { path: 'deletecustomer/:id', component: CustomerDeleteComponent },
  { path: 'newcustomer', component: CustomerAddComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
