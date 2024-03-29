import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../../core.module';
import { AuthService } from '../../services/auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
