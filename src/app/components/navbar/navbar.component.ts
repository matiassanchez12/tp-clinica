import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public userLogged: string | null = null;
  public openUserOptions: boolean = false;
  public currentUrl: string = '';
  public isOpenSidebar: boolean = false;

  constructor(
    private authService: AuthService,
    private renderer: Renderer2,
    private readonly router: Router
  ) {
    authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userLogged = user.email;
        return;
      }
      this.userLogged = null;
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  async onClick() {
    if (this.userLogged) {
      this.openUserOptions = !this.openUserOptions;
      return;
    }

    this.router.navigate(['/login']);
  }

  async onLogout() {
    this.openUserOptions = false;

    await this.authService.signOut();

    this.router.navigate(['/']);
  }

  openSidebar() {
    this.isOpenSidebar = true;
  }

  closeSidebar() {
    this.isOpenSidebar = false;
  }
}
