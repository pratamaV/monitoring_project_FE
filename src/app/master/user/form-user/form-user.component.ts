import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {DivisionModel} from '../../project/project.model';
import {UserModel2, UserModelPojo} from '../user.model';
import {ProjectServiceService} from '../../project/project-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  user: UserModel2;
  userPojo: UserModelPojo;
  loadedDivision: DivisionModel[] = [];
  divisionId: string;
  id: string;
  idParam: string;
  


  isErrorValidation = false;
  errorPassword: string;
  passwordFirst: string;
  passwordSecond: string;
  passwordFirstChange: string;
  passwordSecondChange: string;
  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;


  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllDivision();
    this.route.params.subscribe(params => {
      this.idParam = params.id;
      if (params && params.id) {
        const id: string = params.id;
        this.userService.getUserById(id)
          .subscribe((response) => {
              this.id = id;
              this.setDataToForm(response);
            }, error => {
              alert(error.message);
            }
          );
      }
    });
  }

  private buildForm(): void {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null, [Validators.required]),
      userRole: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      divisiUser: new FormControl(null, [Validators.required]),
      directorateUser: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*?[0-9]).{8,}/)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      statusUser: new FormControl('Active'),
      totalWeight: new FormControl(0),
      totalPerformance: new FormControl(0),
      oldPasswordChange: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*?[0-9]).{8,}/)]),
      newPasswordChange: new FormControl(null, [Validators.required, Validators.pattern(/(?=.*?[0-9]).{8,}/)]),
      confirmPasswordChange: new FormControl(null, [Validators.required]),

    });
  }

  compareDivision(c1: DivisionModel, c2: DivisionModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  passwordMatch() {
    if (this.passwordSecond !== this.passwordFirst) {
      this.errorPassword = 'Password tidak sesuai';
      this.isErrorValidation = true;
    } else {
      this.isErrorValidation = false;
    }

    if (this.passwordSecondChange !== this.passwordFirstChange) {
      this.errorPassword = 'Password tidak sesuai';
      this.isErrorValidation = true;
    } else {
      this.isErrorValidation = false;
    }
  }

  onSaveUser(postData) {
    this.user = {
      id: postData.id,
      username: postData.username,
      userRole: postData.userRole,
      email: postData.email,
      divisiUser: {
        id: postData.divisiUser.id
      },
      directorateUser: postData.directorateUser,
      password: postData.password,
      statusUser: postData.statusUser,
      totalWeight: postData.totalWeight,
      totalPerformance: postData.totalPerformance
    };

    this.userPojo = {
      username: postData.username,
      userRole: postData.userRole,
      email: postData.email,
      divisiUser: {
        id: postData.divisiUser.id
      },
      directorateUser: postData.directorateUser
    };
    // if (valid) {
    this.userService.saveUser(this.user, this.userPojo, this.user.id)
        .subscribe(response => {
          Swal.fire( 'Success', 'User berhasil ditambahkan' , 'success'  );
          if (this.userRoleNew == '04') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/dashboard/user']);
          }
        }, error => {
          Swal.fire( 'Failed', 'Gagal menambahkan user' , 'error'  );
        });
    // }
  }

  onGetAllDivision() {
    this.projectService.getAllDivison()
      .subscribe(data => {
        this.loadedDivision = data;
      }, error => {
        alert(error);
      });
  }

  private setDataToForm(userForm): void {
    this.user = userForm;
    if (this.user) {
      this.userForm.get('id').setValue(this.user.id);
      this.userForm.get('username').setValue(this.user.username);
      this.userForm.get('userRole').setValue(this.user.userRole);
      this.userForm.get('email').setValue(this.user.email);
      this.userForm.get('divisiUser').setValue(this.user.divisiUser);
      this.userForm.get('directorateUser').setValue(this.user.directorateUser);
      // this.userForm.get('password').setValue(this.user.password);
      this.userForm.get('statusUser').setValue(this.user.statusUser);
      this.userForm.get('totalWeight').setValue(this.user.totalWeight);
      this.userForm.get('totalPerformance').setValue(this.user.totalPerformance);
    }
  }

  form(property): AbstractControl {
    return this.userForm.get(property);
  }

  goBack() {
    this.router.navigate(['/dashboard/user']);
  }

  onChangePassword(param) {
    Swal.fire({
      title: 'Apakah anda yakin akan mengubah password?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, ubah!',
      cancelButtonText: 'Tidak, batalkan!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.changePassword(localStorage.getItem('idUser'), param)
          .subscribe(response => {
            Swal.fire({
              title:  'Success!',
              html: 'Password berhasil di ubah',
              icon: 'success',
              showConfirmButton: false,
              timer: 1200
            });
            window.location.reload();
          }, error => {
            Swal.fire( 'Failed', 'Password Gagal di ubah' , 'error'  );
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title:  'Cancelled',
          html: 'Password batal di ubah',
          icon: 'error',
          showConfirmButton: false,
          timer: 1000
        });
      }
    });

  }
}
