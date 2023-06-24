import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public openUserOptions: boolean = false;
  public showNavbar: boolean = false;
  public currentUrl: string = '';
  public isOpenSidebar: boolean = false;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.routerEvent instanceof NavigationEnd) {
        const urlsHiddenNavbar = ['/auth', '/admin'];

        this.showNavbar = !urlsHiddenNavbar.some((url) =>
          event.routerEvent.url.includes(url)
        );

        this.currentUrl = event.routerEvent.url;
      }
    });
  }

  onClick() {
    this.router.navigate(['/auth/login']);
  }

  openSidebar() {
    this.isOpenSidebar = true;
  }

  closeSidebar() {
    this.isOpenSidebar = false;
  }
}
