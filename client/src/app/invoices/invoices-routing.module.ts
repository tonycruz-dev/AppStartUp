import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceDeleteComponent } from './invoice-delete/invoice-delete.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceHomeComponent } from './invoice-home/invoice-home.component';

const routes: Routes = [
  {path: '', component: InvoiceHomeComponent},
  { path: 'editinvoice/:id', component: InvoiceEditComponent },
  { path: 'detailcustomer/:id', component: InvoiceDetailComponent },
  { path: 'deletecustomer/:id', component: InvoiceDeleteComponent },
  { path: 'newcustomer', component: InvoiceAddComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
