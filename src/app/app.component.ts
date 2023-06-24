import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public isRouterAdmin: boolean = true;

  constructor(
    private readonly router: Router,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
  ) {}

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRouterAdmin = event.url.includes('/admin');
      }
    });

    this.authService.isPromiseResolved.subscribe((resolved) => {
      if (resolved) {
        this.ngxService.stop('main');
      } else {
        this.ngxService.start('main');
      }
    });
  }
}
