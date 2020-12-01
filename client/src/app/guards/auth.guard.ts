import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from '../accounts/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountsService,
    private router: Router,
    private toastr: ToastrService) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) { return true; }
        this.router.navigate(['account/signin'], {queryParams: {returnUrl: state.url}});
        this.toastr.error('You shall not pass!');
      })
    );
  }


}
