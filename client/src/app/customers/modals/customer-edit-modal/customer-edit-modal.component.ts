import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Customer, ICustomer } from '../../../shared/Models/Customer';
@Component({
  selector: 'app-customer-edit-modal',
  templateUrl: './customer-edit-modal.component.html',
  styleUrls: ['./customer-edit-modal.component.css']
})
export class CustomerEditModalComponent implements OnInit {
  customerEdit = new Customer() ;
  @Input() updateSelectedRoles = new EventEmitter();
  customer: ICustomer;
  isOpenFrom = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  updateRoles() {
    this.updateSelectedRoles.emit(this.customer);
    this.bsModalRef.hide();
  }

  // tslint:disable-next-line:typedef
  save(customerForm: NgForm) {}

}
