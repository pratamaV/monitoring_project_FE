import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TaskModel, TaskModel3} from '../task.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../task.service';
import {UserModel} from '../../project/project.model';
import {ProjectServiceService} from '../../project/project-service.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css']
})
export class FormTaskComponent implements OnInit {

  taskForm: FormGroup;
  task: TaskModel3;
  id: string;
  loadedUser: UserModel[] = [];
  assignedToId: '';

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router,
              private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllUser();
  }


  private buildForm(): void {
    this.taskForm  = new FormGroup({
      id: new FormControl(null),
      taskName: new FormControl(null, [Validators.required]),
      taskCode: new FormControl(null),
      assignedTo: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [Validators.required]),
      weight: new FormControl(0),
      statusDone: new FormControl('Tidak'),
      taskProsentase: new FormControl(0),
      finalTarget: new FormControl(null, [Validators.required]),
      // taskDoc: new FormControl(null),
      release: new FormControl(localStorage.getItem('releaseId'))
    });
  }

  onSaveTask(postData, valid: boolean){
    this.task = {
      id: postData.id,
      taskName: postData.taskName,
      taskCode: postData.taskCode,
      assignedTo: {
        id: postData.assignedTo
      },
      score: postData.score,
      weight: postData.weight,
      statusDone: postData.statusDone,
      taskProsentase: postData.taskProsentase,
      finalTarget: new Date(postData.finalTarget),
      release: {
        id: postData.release
      }
    };
    console.log(this.task);
    if (valid) {
      this.taskService.addTask(this.task, this.task.id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Task that you input was successfully saved' , 'success'  );
          this.router.navigate(['/dashboard/task']);
        }, error => {
          Swal.fire( 'Failed', 'Failed to save task' , 'error'  );
        });
    }
  }

  // processFile(imageInput: any) {
  //   if (imageInput.files.length > 0) {
  //     const file = imageInput.files[0];
  //     this.taskForm.get('taskDoc').setValue(file);
  //   }
  // }

  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
      }, error => {
        alert(error);
      });
  }
}
