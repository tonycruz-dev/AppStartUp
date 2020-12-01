import { ICustomer } from './Customer';

export class CustomerParams {
    gender: string;
    pageNumber = 1;
    pageSize = 10;
    orderBy = 'customerName';
    search = '';

    // constructor(customers: ICustomer) {
    //     this.gender = customers.gender === 'female' ? 'male' : 'female';
    // }
}
