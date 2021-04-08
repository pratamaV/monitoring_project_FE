import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import Swal from '../../../../node_modules/sweetalert2';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {LogErrorService} from '../../master/log-error.service';
import {LogErrorModel} from "../../master/log-error.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup;
  isLoading = false;
  idLog: string;
  logError: LogErrorModel;

  constructor(private authService: AuthService, private router: Router,
              private logErrorService: LogErrorService) {
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
    this.isLoading = true;
    this.authService.forgotPass(data)
      .subscribe(() => {
        this.isLoading = false;
        Swal.fire({
          title: 'Success!',
          text: 'Check your email for new Password',
          icon: 'success',
          timer: 2500,
          showConfirmButton: true
        }).then(
          function() {
          },
          function(dismiss) {
            if (dismiss === 'timer') {
            }
          });
        this.router.navigate(['/']);
      }, (error) => {
        this.setDataForm();
        this.isLoading = false;
        Swal.fire({
          title: 'Failed Reset Password',
          icon: 'error',
          timer: 2500,
          showConfirmButton: false
        });
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Forgot Password',
          isActive: true
        };
        this.logErrorService.saveLogError(this.logError, this.idLog)
          .subscribe(response => {
            // tslint:disable-next-line:no-shadowed-variable
          }, error => {
            alert('Gagal merekam kesalahan');
          });
      });
  }

// tslint:disable-next-line:typedef
  setDataForm() {
    this.forgotPassForm.get('pass').setValue('');
  }

}

