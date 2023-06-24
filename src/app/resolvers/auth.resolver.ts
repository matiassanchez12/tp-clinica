import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../interfaces';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class AuthResolver implements Resolve<IUser | null> {
  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<IUser | null> {
    return null;
  }
}
