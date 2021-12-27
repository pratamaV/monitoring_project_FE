import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskModel, TaskModel3,  TaskModel2} from '../task.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';
import {UserModel} from '../../project/project.model';
import {ProjectServiceService} from '../../project/project-service.service';
import Swal from 'sweetalert2';
import {ReleaseService} from "../../release/release.service";
import {ReleaseModel, ReleaseModel2} from "../../release/release.model";

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {

  taskForm: FormGroup;
  task: TaskModel2;
  task3: TaskModel3;
  id: string;
  username: string;
  loadedUser: UserModel[] = [];
  assignedTo;
  users: UserModel;
  release: ReleaseModel2;
  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router,
              private projectService: ProjectServiceService,
              private releaseService: ReleaseService) { }

  ngOnInit(): void {
    this.onGetReleaseById();
    this.buildForm();
    this.onGetAllUser();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.taskService.getTaskById(id)
          .subscribe((response) => {
              this.id = id;
              this.username = response.assignedTo.username;
              this.setDataToForm(response);
            }, error => {
              alert(error.message);
            }
          );
      }
    });
  }


  private buildForm(): void {
    this.taskForm  = new FormGroup({
      id: new FormControl(null),
      taskName: new FormControl(null, [Validators.required]),
      taskCode: new FormControl(null),
      assignedTo: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [Validators.required, Validators.pattern('^(?:[1-9]|0[1-9]|10)$')]),
      weight: new FormControl(0),
      statusDone: new FormControl('NOT STARTED'),
      taskProsentase: new FormControl(0),
      estStartDate: new FormControl(null, [Validators.required]),
      estEndDate: new FormControl(null, [Validators.required]),
      actStartDate: new FormControl(null),
      actEndDate: new FormControl(null),
      release: new FormControl(localStorage.getItem('releaseId'))
    });
  }

  private setDataToForm(taskForm): void {
    this.task = taskForm;
    if (this.task) {
      this.assignedTo = this.task.assignedTo.username;
      this.taskForm.get('id').setValue(this.task.id);
      this.taskForm.get('taskName').setValue(this.task.taskName);
      this.taskForm.get('taskCode').setValue(this.task.taskCode);
      this.taskForm.get('assignedTo').setValue(this.task.assignedTo);
      this.taskForm.get('score').setValue(this.task.score);
      this.taskForm.get('weight').setValue(this.task.weight);
      this.taskForm.get('statusDone').setValue(this.task.statusDone);
      this.taskForm.get('taskProsentase').setValue(this.task.taskProsentase);
      this.taskForm.get('estStartDate').setValue(this.task.estStartDate);
      this.taskForm.get('estEndDate').setValue(this.task.estEndDate);
      this.taskForm.get('actStartDate').setValue(this.task.actStartDate);
      this.taskForm.get('actEndDate').setValue(this.task.actEndDate);
      this.taskForm.get('release').setValue(this.task.release.id);
    }
  }

  onGetReleaseById(){
    this.releaseService.getReleaseById(localStorage.getItem('releaseId'))
      .subscribe(response => {
        this.release = response;
      }, error => {
        alert(error.message);
      });
  }

  compareAssignedTo(c1: UserModel, c2: UserModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  form(property): AbstractControl {
    return this.taskForm.get(property);
  }

  // tslint:disable-next-line:typedef
  onSaveTask(postData, valid: boolean){
    this.task3 = {
      id: postData.id,
      taskName: postData.taskName,
      taskCode: postData.taskCode,
      assignedTo: {
        id: postData.assignedTo.id
      },
      score: postData.score,
      weight: postData.weight,
      statusDone: postData.statusDone,
      taskProsentase: postData.taskProsentase,
      estStartDate: new Date(postData.estStartDate),
      estEndDate: new Date(postData.estEndDate),
      actStartDate: new Date(postData.actStartDate),
      actEndDate: new Date(postData.actEndDate),
      release: {
        id: postData.release
      }
    };
    if (valid) {
      this.taskService.addTask(this.task3, this.task3.id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Berhasil menyimpan task' , 'success'  );
          this.router.navigate(['/dashboard/task']);
        }, error => {
          Swal.fire( 'Failed', 'Gagal menyimpan task' , 'error'  );
        });
    }
  }

  // tslint:disable-next-line:typedef
  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
      }, error => {
        alert(error);
      });
  }

  onGolistTask() {
    this.router.navigate(['/dashboard/task']);
  }
}
