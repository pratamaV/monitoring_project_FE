import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import Swal from '../../../../node_modules/sweetalert2';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  form(property): AbstractControl {
    return this.forgotPassForm.get(property);
  }

// , Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]
  private buildForm(): void {
    this.forgotPassForm = new FormGroup({
      email: new FormControl(null),
      pass: new FormControl(null, [Validators.required]),
      confirmpass: new FormControl(null, [Validators.required])
    });
  }

  submit(data) {
    this.authService.forgotPass(data)
      .subscribe(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Check your email for new Password',
          icon: 'success',
          timer: 2500,
          showConfirmButton: true
        }).then(
          function () {
          },
          function (dismiss) {
            if (dismiss === 'timer') {
            }
          });
        // console.log('halo', data);
        this.router.navigate(['/auth']);
      }, (error) => {
        this.setDataForm();
        Swal.fire({
          title: 'Failed Reset Password',
          icon: 'error',
          timer: 2500,
          showConfirmButton: false
        });
      });
  }

// tslint:disable-next-line:typedef
  setDataForm() {
    this.forgotPassForm.get('pass').setValue('');
  }

}

