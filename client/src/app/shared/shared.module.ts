import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TextInputComponent } from './text-input/text-input.component';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  declarations: [TextInputComponent, ConfirmDialogComponent, RolesModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    ModalModule.forRoot(),
    UiSwitchModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    TextInputComponent,
    HttpClientModule,
    BsDropdownModule,
    ButtonsModule,
    ToastrModule,
    PaginationModule,
    BsDatepickerModule,
    ModalModule,
    TabsModule,
    TimeagoModule,
    ConfirmDialogComponent,
    RolesModalComponent,
    UiSwitchModule
  ]
})
export class SharedModule { }
