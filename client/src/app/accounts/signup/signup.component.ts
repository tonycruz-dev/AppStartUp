import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/User';
import { AccountsService } from '../accounts.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup | undefined;
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
   this.registerForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators
       .pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
     password: new FormControl('', Validators.required),
     nickName: new FormControl('', Validators.required),
   });
 }
 onSubmit(): void {
   this.accountService.registerClient(this.registerForm.value).subscribe(() => {
     this.router.navigateByUrl('/customers');
   });
 }
}
