import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../master/task/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../../master/task/task.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  numberTask = 0;
  token = window.sessionStorage.getItem('token');
  tokenParse = JSON.parse(this.token);
  user = this.tokenParse.user;
  paramNull = {
    taskDoc: null,
    statusDone: null,
    releaseName: null,
    projectName: null,
    estStartDate: null
  };
  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onGetTaskByUserId();
  }

  onGetTaskByUserId() {
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'), this.paramNull)
      .subscribe((data)  => {
        for (const task of data) {
          if (task.statusDone === 'Tidak'){
            this.numberTask = this.numberTask + 1;
          }
        }
      }, error => {
        alert(error);
      });
  }

  logout(){
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('STATE');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
