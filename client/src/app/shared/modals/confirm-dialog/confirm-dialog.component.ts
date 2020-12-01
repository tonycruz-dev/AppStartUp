import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  result: boolean;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  confirm() {
    this.result = true;
    this.bsModalRef.hide();
  }

  // tslint:disable-next-line:typedef
  decline() {
    this.result = false;
    this.bsModalRef.hide();
  }

}
