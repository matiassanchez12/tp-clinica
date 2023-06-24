import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../../components/card/card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AuthRoutingModule } from './auth-routing.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoggedGuard } from 'src/app/guards';

@NgModule({
  declarations: [CardComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxUiLoaderModule,
    AuthRoutingModule,
  ],
  providers: [LoggedGuard],
})
export class AuthModule {}
