import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.authService.isPromiseResolved.next(false);

    const observable = this.authService.getUser().pipe(
      map((user) => {
        let next = true;

        if (!user || user.type !== 'admin') {
          this.router.navigate(['/auth/login']);

          next = false;
        }

        this.authService.userLogged.next(user);

        this.authService.isPromiseResolved.next(true);

        return next;
      }),
      take(1)
    );

    return observable;
  }
}
