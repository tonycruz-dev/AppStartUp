import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  get404Error() {
    this.http.get(this.baseUrl + 'api/buggy/not-found').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  get400Error() {
    this.http.get(this.baseUrl + 'api/buggy/bad-request').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  get500Error() {
    this.http.get(this.baseUrl + 'api/buggy/server-error').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  get401Error() {
    this.http.get(this.baseUrl + 'api/buggy/auth').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  get400ValidationError() {
    this.http.post(this.baseUrl + 'api/account/register', {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      // errors: Array(3)
      this.validationErrors = error.errors;
    });
  }
}
