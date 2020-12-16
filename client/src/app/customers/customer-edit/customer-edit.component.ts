import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Customer, ICustomer } from './../../shared/Models/Customer';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomersService } from '../customers.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { EditJobItemComponent } from '../modals/edit-job-item/edit-job-item.component';
import { IJobItem, JobItem } from 'src/app/shared/Models/JobItem';
import { AddJobItemComponent } from '../modals/add-job-item/add-job-item.component';
import swal from 'sweetalert2';
import { AddInvoiceComponent } from '../modals/add-invoice/add-invoice.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('customersTabs', {static: true}) customersTabs: TabsetComponent;
  customerEdit = new Customer() ;
  customer: ICustomer;
  isOpenFrom = false;
  activeTab: TabDirective;
  bsModalRef: BsModalRef;

  // tslint:disable-next-line:typedef
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private customerServices: CustomersService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
   this.loadCustomer();

  }

  loadCustomer(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.customerServices
    .getCustomerById(id)
    .subscribe(response => {
      this.customer = response;
      console.log(this.customer);
      console.log(this.customer.jobItems);
      this.customer.dateOfBirth = new Date(this.customer.dateOfBirth);
      this.customerEdit = response;
    });
  }

  updateCustomers(): void {
    this.customerServices.updateCustomer(this.customer).subscribe(() => {
      this.toastr.success('Customer was updated successfully');
      this.editForm.reset(this.customer);
    });
  }
  selectTab(tabId: number): void {
    this.customersTabs.tabs[tabId].active = true;
  }

  // tslint:disable-next-line:typedef
  openEditModal(jobItem: IJobItem) {
    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        jobItem
      }
    };
    this.bsModalRef = this.modalService.show(EditJobItemComponent, config);
    this.bsModalRef.content.updateSelectedJobs.subscribe(values => {
      console.log(values);
      this.customerServices.UpdateJobItem(values).subscribe(() => {
        this.toastr.success('Job Item was updated successfully');
      });
    });

  }
   // tslint:disable-next-line:typedef
   openAddJobItemModal() {
    // tslint:disable-next-line:prefer-const
    let jobItem = new JobItem();
    jobItem.title = '';
    jobItem.jobDate =  new Date();
    jobItem.jobDescription = '';
    jobItem.amount = 0;
    jobItem.customerId = this.customer.id;
    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        jobItem
      }
    };
    this.bsModalRef = this.modalService.show(AddJobItemComponent, config);
    this.bsModalRef.content.addSelectedJobs.subscribe(values => {
      console.log(values);
      this.customerServices.addJobItem(values).subscribe((newJobItem) => {
        this.customer.jobItems.push(newJobItem);
        this.toastr.success('Job Item was Add successfully');
      });
    });

  }

  // tslint:disable-next-line:typedef
  async deleteJobItemModal(jobitem: IJobItem) {

    const result = await swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Job Item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });
    if (result.value)
    {
      console.log(result.value);
      this.customerServices.deleteJobItem(jobitem).subscribe((newJobItem) => {
        this.customer.jobItems = [...this.customer.jobItems.filter(ji => ji.id !== jobitem.id)];
        swal.fire(
          'Deleted!',
          'Your Job Item has been deleted.',
          'success'
          );
      });
    } else if (result.dismiss === swal.DismissReason.cancel)
    {
      swal.fire(
        'Cancelled',
        'Your Job Item is safe :)',
        'error'
        );
    }
  }
  openAddInvoiceModal(): void {
    const listJobs = [ ...this.customer.jobItems];
    const config = {
      class: 'modal-dialog-centered modal-lg',
      initialState: {
        listJobs
      }
    };
    this.bsModalRef = this.modalService.show(AddInvoiceComponent, config);
    this.bsModalRef.content.updateSelectedInvoice.subscribe(values => {
      // console.log(values);
      // this.customerServices.UpdateJobItem(values).subscribe(() => {
      //   this.toastr.success('Invoice created successfully');
      // });
    });
  }

  onTabActivated(data: TabDirective): void {
    this.activeTab = data;
  }

}
