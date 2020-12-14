import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {IJobItem } from '../../../shared/Models/JobItem';

@Component({
  selector: 'app-edit-job-item',
  templateUrl: './edit-job-item.component.html',
  styleUrls: ['./edit-job-item.component.css']
})
export class EditJobItemComponent implements OnInit {
  @Input() updateSelectedJobs = new EventEmitter();
  jobItem: IJobItem;
  isOpenFrom = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.jobItem.jobDate = new Date(this.jobItem.jobDate);
  }

  // tslint:disable-next-line:typedef
  updateRoles() {
    this.updateSelectedJobs.emit(this.jobItem);
    this.bsModalRef.hide();
  }

  // tslint:disable-next-line:typedef
  save(jobItemForm: NgForm) {}

}
