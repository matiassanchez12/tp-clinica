import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhoiamComponent } from './landing/whoiam/whoiam.component';
import { WelcomeComponent } from './landing/welcome/welcome.component';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'about', component: WhoiamComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AdminRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
