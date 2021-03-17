import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
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
  console.log('ini property');
  console.log(property);
}

private buildForm(): void {
  this.forgotPassForm = new FormGroup({
    // id: new FormControl(null),
    pass: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)])
  });
  console.log(FormGroup);
}

submit(data: User) {
  console.log('sampe sini');
  console.log(data);
  this.authService.save(data)
    .subscribe(() => {
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
      console.log('halo', data);
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
setDataForm(){
  this.forgotPassForm.get('pass').setValue('');
}

}

