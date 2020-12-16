import { IInvoice } from './Invoice';
import { IJobItem } from './JobItem';

export interface ICustomer {
    id: number;
    customerName: string;
    companyName: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
    address5: string;
    dateOfBirth: Date;
    gender: string;
    discontinued: boolean;
    photoUrl: string;
    noteInfo: string;
    jobItems: IJobItem[];
    invoices: IInvoice[];
}
export class Customer {
  id: number;
  customerName: string;
  companyName: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  dateOfBirth: Date;
  gender: string;
  discontinued: boolean;
  photoUrl: string;
  noteInfo: string;
}
