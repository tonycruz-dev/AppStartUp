import { CustomerEditComponent } from './../../customers/customer-edit/customer-edit.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService ) {}
  canDeactivate( component: CustomerEditComponent): Observable<boolean>| boolean  {
    // if (component.editForm.dirty) {
    //   return this.confirmService.confirm();
    // }
    return true;
  }

}
