import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceHomeComponent } from './invoice-home/invoice-home.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceDeleteComponent } from './invoice-delete/invoice-delete.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';


@NgModule({
  declarations: [InvoiceHomeComponent, InvoiceEditComponent, InvoiceDeleteComponent, InvoiceDetailComponent, InvoiceAddComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule
  ]
})
export class InvoicesModule { }
