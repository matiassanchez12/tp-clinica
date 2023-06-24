import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  WelcomeComponent,
  WhoiamComponent,
  AdminRoutingModule,
  AuthRoutingModule,
} from './pages';
import { LoggedGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedGuard],
    children: [
      { path: '', component: WelcomeComponent },
      { path: 'about', component: WhoiamComponent },
    ],
  },
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
