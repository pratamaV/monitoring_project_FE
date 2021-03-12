import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {DivisionModel} from '../../project/project.model';
import {UserModel2} from '../user.model';
import {ProjectServiceService} from '../../project/project-service.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  userForm: FormGroup;
  user: UserModel2;
  loadedDivision: DivisionModel[] = [];
  divisionId: string;
  id: string;

  isErrorValidation = false;
  errorPassword: string;
  passwordFirst: string;
  passwordSecond: string;


  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllDivision();
    this.route.params.subscribe(params => {
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
      username: new FormControl(null),
      userRole: new FormControl(null),
      email: new FormControl(null),
      divisiUser: new FormControl(null),
      directorateUser: new FormControl(null),
      password: new FormControl(null),
      confirmPassword: new FormControl(null),
      statusUser: new FormControl('aktif'),
      totalWeight: new FormControl(null),
      totalPerformance: new FormControl(null)
    });
  }

  passwordMatch() {
    if (this.passwordSecond !== this.passwordFirst) {
      this.errorPassword = 'Password does not match';
      this.isErrorValidation = true;
    } else {
      this.isErrorValidation = false;
    }
  }

  onSaveUser(postData, valid: boolean) {
    this.user = {
      id: postData.id,
      username: postData.username,
      userRole: postData.userRole,
      email: postData.email,
      divisiUser: {
        id: postData.divisiUser
      },
      directorateUser: postData.directorateUser,
      password: postData.password,
      statusUser: postData.statusUser,
      totalWeight: postData.totalWeight,
      totalPerformance: postData.totalPerformance
    };
    if (valid) {
      this.userService.saveProject(this.user, this.user.id)
        .subscribe(response => {
          this.router.navigate(['/dashboard/user']);
        }, error => {
          alert(error.message);
        });
    }
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
      this.userForm.get('password').setValue(this.user.password);
      this.userForm.get('statusUser').setValue(this.user.statusUser);
      this.userForm.get('totalWeight').setValue(this.user.totalWeight);
      this.userForm.get('totalPerformance').setValue(this.user.totalPerformance);
    }
  }

  form(property): AbstractControl {
    return this.userForm.get(property);
  }

}
