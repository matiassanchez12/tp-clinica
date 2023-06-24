import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';
import { HttpClientModule } from '@angular/common/http';
import { timeFromNowPipe } from '../../pipes/timefromnow/time-from-now.pipe';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AuthAdminGuard } from 'src/app/guards/auth-admin.guard';
import { AuthResolver } from 'src/app/resolvers';
import { AdminComponent } from './admin.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    timeFromNowPipe,
    AdminComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AvatarModule,
    NgxUiLoaderModule,
    AdminRoutingModule,
  ],
  providers: [AuthAdminGuard, AuthResolver],
})
export class AdminModule {}
