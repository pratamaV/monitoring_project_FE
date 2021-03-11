import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskModel } from './task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  isLoading = false;
  loadTask: TaskModel[] = [];
  page = 1;
  pageSize = 3;
  totalItems = 0;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.onGetTask();
    console.log(this.loadTask);
    
  }

  onGetTask(){
  this.loadTask.push({"id":"123",
                      "taskName":"tes",
                      "assignedTo":"pak rahmad",
                      "score":10,
                      "weight":18,
                      "statusDone":"on progres",
                      "taskProsentase":"70%",
                      "finalTarget":"12/04/2020",
                      "taskDocument":"dokumen"} )
  }
  deleteTask(id: string){
    alert("Apakah anda yakin untuk mengahapus task ini?")
  }

  onStatusChange(){
    alert("Status sudah di ubah")
  }

  onPageChanges(event) {
    this.page = event;
    // this.onGetCustomer();
  }

}
