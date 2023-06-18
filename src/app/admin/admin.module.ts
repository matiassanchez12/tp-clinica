import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatars';
import { HttpClientModule } from '@angular/common/http';
import { timeFromNowPipe } from '../pipes/timefromnow/time-from-now.pipe';

@NgModule({
  declarations: [HomeComponent, ChatComponent, timeFromNowPipe],
  imports: [CommonModule, FormsModule, HttpClientModule, AvatarModule],
})
export class AdminModule {}
