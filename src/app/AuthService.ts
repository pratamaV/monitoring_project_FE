import {of} from 'rxjs';

export class AuthService {
  isLogin = false;
  roleAs = localStorage.getItem('role');
  // tslint:disable-next-line:typedef
  login(value: string) {
    this.isLogin = true;
    localStorage.setItem('STATE', 'true');
    return of({success: this.isLogin, role: this.roleAs});
  }
  // tslint:disable-next-line:typedef
  isLoggedIn(){
    const loggedIn = localStorage.getItem('STATE');
    if ( loggedIn === 'true'){
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }
  // tslint:disable-next-line:typedef
  getRole(){
    this.roleAs = localStorage.getItem('role');
    return this.roleAs;
  }
}

