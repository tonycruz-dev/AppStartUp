import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Customer, ICustomer } from '../../../shared/Models/Customer';

@Component({
  selector: 'app-add-modal-customer',
  templateUrl: './add-modal-customer.component.html',
  styleUrls: ['./add-modal-customer.component.css']
})
export class AddModalCustomerComponent implements OnInit {
  customer: Customer ;
  @Input() saveCustomerEvent = new EventEmitter();

  isOpenFrom = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  saveCustomer(): void {
    this.saveCustomerEvent.emit(this.customer);
    this.bsModalRef.hide();
  }


  save(customerForm: NgForm): void {}
}
