import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/auth/user.model';
import { TaskModel, TaskModel2 } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {

  task : TaskModel;
  loadedTask : TaskModel2;
  user : any
  token : any

  constructor(private taskService : TaskService, router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.onGetTaskByUser()
  }

  onGetTaskByUser(){
    this.token = window.sessionStorage.getItem('token');
    this.user = JSON.parse(this.token)
    console.log(this.user.user.id);
    this.taskService.getTaskByUserId(this.user.user.id)    
    .subscribe(data => {
      this.loadedTask = data;
      console.log(this.loadedTask);
      
    }, error => {
      alert(error)
    })
  }

}
