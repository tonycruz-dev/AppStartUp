import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IInvoice, Invoice } from 'src/app/shared/Models/Invoice';
import { IJobItem, JobItem } from 'src/app/shared/Models/JobItem';
import { Customer, ICustomer } from '../../../shared/Models/Customer';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoice = new Invoice() ;
  @Input() updateSelectedInvoice = new EventEmitter();
  invoiceEdit: IInvoice;
  listJobs: JobItem [] = [];
  isOpenFrom = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  saveInvoice(): void {
    this.updateSelectedInvoice.emit(this.listJobs);
    this.bsModalRef.hide();
  }

  // tslint:disable-next-line:typedef
  save(invoiceForm: NgForm) {}
  selectedForInvoice(jobitem: IJobItem): void {
   console.log(jobitem);
  }

}
