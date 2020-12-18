import { InvoiceItem } from './InvoiceItem';

export interface IInvoice {
    id: number;
    customerId: number;
    invoiceAddress: string;
    invoiceDate: string;
    invoiceYesNo: boolean;
    totalValue: number;
    totalPaid: number;
    datePaid: string;
    isPosted: boolean;
}

export class Invoice {
    id: number;
    customerId: number;
    invoiceAddress: string;
    invoiceDate: string;
    invoiceYesNo: boolean;
    totalValue: number;
    totalPaid: number;
    datePaid: string;
    isPosted: boolean;
}
export class InvoiceToInsert {
    id: number;
    customerId: number;
    invoiceAddress: string;
    invoiceDate: string;
    invoiceYesNo: boolean;
    totalValue: number;
    totalPaid: number;
    datePaid: string;
    isPosted: boolean;
    invoiceItems: InvoiceItem[] = [];
}
