import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'invoices',
    loadChildren: () =>
      import('./invoices/invoices.module').then(m => m.InvoicesModule)
  },
  {
    path: 'errors',
    loadChildren: () =>
      import('./errors/errors.module').then(m => m.ErrorsModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./accounts/accounts.module').then(mod => mod.AccountsModule)}
  ,
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
