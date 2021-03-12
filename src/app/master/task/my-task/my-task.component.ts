import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../task.model';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskForm: FormGroup;
  loadedTask: TaskModel2;
  task: TaskModel;
  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onGetTaskByUserId();
    this.buildForm();
  }

  private buildForm(): void {
    this.taskForm  = new FormGroup({
      taskDoc: new FormControl(null)
    });
  }

  onGetTaskByUserId() {
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'))
      .subscribe(data => {
        this.loadedTask = data;
        console.log(this.loadedTask);
      }, error => {
        alert(error);
      });
  }

  onDoneTask(idRelease, task){
    this.taskService.doneTask(idRelease, task)
      .subscribe(data => {
        alert('success');
        window.location.reload();
      }, error => {
        alert(error.message);
      });
  }

  onUploadDocument(postData, valid: boolean, id){
    console.log(postData);
    if (valid) {
      this.taskService.uploadDocumentTask(postData, id)
        .subscribe(response => {
          // this.router.navigate(['/dashboard/task']);
        }, error => {
          alert(error.message);
        });
    }
  }

  processFile(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.taskForm.get('taskDoc').setValue(file);
    }
  }

}
