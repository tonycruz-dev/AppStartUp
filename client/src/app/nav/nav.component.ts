import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from '../accounts/accounts.service';
import { IUser } from '../shared/models/User';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navbarOpen = false;
  title = 'optimun care 4 u';
  currentUser$: Observable<IUser>;
  userDetails: IUser;
  constructor(private accountService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.accountService.currentUser$.subscribe(user => {
      this.userDetails = user;
    });
  }

  toggleNavbar(): boolean {
    return this.navbarOpen = !this.navbarOpen;
  }
  // tslint:disable-next-line:typedef
  logout() {
   this.accountService.logout();
   this.router.navigateByUrl('/account');
  }

}
