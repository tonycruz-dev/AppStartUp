import { Component, OnInit } from '@angular/core';
import { AccountsService } from './accounts/accounts.service';
import { IUser } from './shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private accountService: AccountsService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    const user: IUser = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
    }
  //   const token = localStorage.getItem('token');
  //   this.accountService.loadCurrentUser(token).subscribe(() => {
  //     console.log('loaded user');
  //   }, error => {
  //     console.log(error);
  //   });
  }
}
