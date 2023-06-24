import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from 'src/app/interfaces';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public userLogged: IUser | undefined;
  public openUserMenu: boolean = false;
  public openSidebar: boolean = false;
  public currentUrl: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userLogged.subscribe((user) => {
      this.userLogged = user;
    });
  }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.routerEvent instanceof NavigationEnd) {
        const urlsHiddenNavbar = ['/auth', '/admin'];

        this.currentUrl = event.routerEvent.url;
      }
    });
  }

  toggleOpenUserMenu() {
    this.openUserMenu = !this.openUserMenu;
  }

  toggleOpenSidebar() {
    this.openSidebar = !this.openSidebar;
  }

  async onLogout() {
    this.openUserMenu = false;

    await this.authService.signOut();

    this.router.navigate(['/']);
  }
}
