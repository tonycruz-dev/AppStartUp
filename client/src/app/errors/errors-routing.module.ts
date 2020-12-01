import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { TestErrorsComponent } from './test-errors/test-errors.component';

const routes: Routes = [
  {path: '', component: TestErrorsComponent},
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
