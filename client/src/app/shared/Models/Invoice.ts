import { InvoiceItem } from './InvoiceItem';

export interface IInvoice {
    id: number;
    customerId: number;
    title: string;
    invoiceAddress: string;
    invoiceDate: Date;
    invoiceYesNo: boolean;
    totalValue: number;
    totalPaid: number;
    datePaid: Date;
    isPosted: boolean;
}

export class Invoice {
    id: number;
    customerId: number;
    title: string;
    invoiceAddress: string;
    invoiceDate: Date;
    invoiceYesNo: boolean;
    totalValue: number;
    totalPaid: number;
    datePaid: Date;
    isPosted: boolean;
}
export class InvoiceToInsert {
    id: number;
    customerId: number;
    invoiceAddress: string;
    title: string;
    invoiceDate: Date;
    invoiceYesNo: boolean;
    totalValue: number;
    totalPaid: number;
    datePaid: Date;
    isPosted: boolean;
    invoiceItems: InvoiceItem[] = [];
}
