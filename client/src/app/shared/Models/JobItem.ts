export interface IJobItem {
    id: number;
    customerId: number;
    title: string;
    jobDescription: string;
    jobDate: Date;
    amount: number;
    isInvoiced: boolean;
}

export class JobItem {
    id: number;
    customerId: number;
    title: string;
    jobDescription: string;
    jobDate: Date;
    amount: number;
    isInvoiced: boolean;
}
