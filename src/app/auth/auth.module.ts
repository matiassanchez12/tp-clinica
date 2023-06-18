import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from '../components/card/card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [CardComponent, LoginComponent, RegisterComponent],
  imports: [CommonModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
