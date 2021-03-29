import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService as AuthGuard } from '../../AuthService';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  token: any;
  x: any;
  valueEmail: string;
  forgetPassword;
  isLoading = false;

  year: number;

  constructor(
    private authService: AuthService,
    private auth: AuthGuard,
    private router: Router
  ) {}

  ngOnInit(): void {
    var d = new Date();
    this.year = d.getFullYear();
    this.buildForm();
  }

  form(property): AbstractControl {
    return this.loginForm.get(property);
  }

  private buildForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(value) {
    const body = new HttpParams()
      .set('username', value.email)
      .set('password', value.password)
      .set('grant_type', 'password');
    this.authService.login(body.toString()).subscribe(
      data => {
        var resultBody;
        resultBody = data;

        localStorage.setItem('token', resultBody.access_token);
        localStorage.setItem('role', resultBody.user.userRole);
        localStorage.setItem('idUser', resultBody.user.id);
        console.log('datanya adalah: ', localStorage.getItem('idUser'));

        window.sessionStorage.setItem('token', JSON.stringify(data));
        this.token = window.sessionStorage.getItem('token');
        this.x = JSON.parse(this.token);
        if (this.x.user.statusUser === 'aktif') {
          this.auth.login(this.x.user.userRole);
          Swal.fire('Success', 'Success Login', 'success');
          this.router.navigate(['/home']);
        } else {
          Swal.fire(
            'Failed',
            'Your account still inactive, please check your email to verified your account',
            'error'
          );
          this.router.navigate(['/login']);
        }
      },
      error => {
        Swal.fire('Failed', 'Email or password incorrect', 'error');
      }
    );
  }

  // onSendEmail(valueEmail: string) {
  //   this.isLoading = true;
  //   this.userService.forgetPassword(valueEmail).subscribe(response => {
  //     this.isLoading = false;
  //     Swal.fire('Sukses',
  //       'Kata sandi baru akan dikirim melalui email',
  //       'success');
  //   }, error => {
  //     Swal.fire(
  //       'Gagal',
  //       'error',
  //       'error'
  //     );
  //   });
  //   this.router.navigate(['/admin']);

  // }
}
