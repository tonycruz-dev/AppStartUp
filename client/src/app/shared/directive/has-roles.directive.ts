import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { IUser } from '../Models/User';
import { AccountsService } from '../../accounts/accounts.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit {

  @Input() appHasRole: string[];
  user: IUser;

  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private accountsService: AccountsService) {
      this.accountsService.currentUser$.pipe(take(1)).subscribe(user => {
        this.user = user;
      });
     }

  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some(r  => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
