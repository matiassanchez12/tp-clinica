import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin.component';
import { AuthAdminGuard } from 'src/app/guards';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthAdminGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
