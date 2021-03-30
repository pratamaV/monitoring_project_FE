import { Location } from '@angular/common';
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {AuthService} from './AuthService';

@Injectable()

export class AuthGuardService implements CanActivate, CanDeactivate<unknown>, CanLoad {
  constructor(private authService: AuthService, private router: Router, private _location: Location) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      if (route.data.role != undefined){
        // console.log("isi datanya adalah: ", route.data.role.indexOf("1"));
        if (route.data.role.indexOf(userRole) < 0){
          // console.log("masuk sini dong", route.data.role.indexOf(userRole));
          Swal.fire( 'Failed', 'You haven not right access' , 'error'  );

          this.router.navigate(['/home']);
      // this._location.back();
        }
      }

      // if (route.data.role && route.data.role.indexOf(userRole) === -1) {
      //   this.router.navigate(['/auth']);
      //   return false;
      // }
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
  data(){
    console.log('ini data');
  }
}


