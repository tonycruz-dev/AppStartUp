import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/User';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup | undefined;
   returnUrl: string | undefined;
   currentUser$: Observable<IUser> | undefined;

  constructor(
    private accountService: AccountsService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    this.createLoginForm();
  }

  // tslint:disable-next-line:typedef
  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators
        .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }
  onSubmit(): void {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl('/customers');
    });
  }
}
