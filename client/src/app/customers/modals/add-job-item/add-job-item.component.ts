import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {IJobItem, JobItem } from '../../../shared/Models/JobItem';

@Component({
  selector: 'app-add-job-item',
  templateUrl: './add-job-item.component.html',
  styleUrls: ['./add-job-item.component.css']
})
export class AddJobItemComponent implements OnInit {

  @Input() addSelectedJobs = new EventEmitter();
  jobItem = new JobItem();
  isOpenFrom = false;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    // this.jobItem.jobDate = new Date();
  }

  // tslint:disable-next-line:typedef
  addNewJobItem() {
    this.addSelectedJobs.emit(this.jobItem);
    this.bsModalRef.hide();
  }

  // tslint:disable-next-line:typedef
  save(jobItemForm: NgForm) {}

}
