import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IChatMessage, IUser } from 'src/app/interfaces';
import { timeFromNowPipe } from 'src/app/pipes/timefromnow/time-from-now.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { DbService } from 'src/app/services/db-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [timeFromNowPipe],
})
export class ChatComponent {
  public users: IUser[] = [];
  public usersSubscription: Observable<IUser[]>;
  public currentChatMessagesSubscription: Subscription | undefined;
  public currentChatMessages: IChatMessage[] | undefined;
  public isLoading: boolean = true;
  public userSelected: string = '';
  public userLogged: firebase.default.User | undefined;
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  public constructor(
    private bdService: DbService,
    private chatService: ChatService,
    private authService: AuthService
  ) {
    this.usersSubscription = bdService.getAllUsers();

    this.usersSubscription.subscribe((users) => {
      this.isLoading = false;
      this.users = users;
    });

    authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userLogged = user;
        return;
      }
      this.userLogged = undefined;
    });
  }

  public handleClickChat(id: string) {
    this.userSelected = id;

    if (this.currentChatMessagesSubscription) {
      this.currentChatMessagesSubscription.unsubscribe();
    }

    if (this.userLogged) {
      this.currentChatMessagesSubscription = this.chatService
        .getChatMessages(this.userLogged.uid, id)
        .subscribe((messages) => {
          this.currentChatMessages = messages;
          setTimeout(() => {
            this.scrollToBottom();
          }, 200);
        });
    }
  }

  public handleAddMessage(message: string) {
    if (this.userLogged) {
      this.chatService
        .createMessage(message, this.userSelected, this.userLogged.uid)
        .then(() => {
          this.scrollToBottom();
        });
    }
  }

  public getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  private scrollToBottom() {
    const container = this.chatContainer.nativeElement;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth',
    });
  }

  ngOnDestroy() {
    if (this.currentChatMessagesSubscription) {
      this.currentChatMessagesSubscription.unsubscribe();
    }
  }
}
