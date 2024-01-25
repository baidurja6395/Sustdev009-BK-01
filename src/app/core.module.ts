import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormService } from './services/form.service';
import { ApiService } from './services/api.service';
import { ValidationMessageModule } from './components/validation-message/validation-message.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ValidationMessageModule,
    ToastrModule.forRoot()
  ],
  providers:[
    FormService,
    ApiService
  ],
  exports:[AngularMaterialModule,ReactiveFormsModule,ToastrModule,ValidationMessageModule]
})
export class CoreModule { }
