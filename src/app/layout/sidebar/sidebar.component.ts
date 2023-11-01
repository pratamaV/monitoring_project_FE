import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../master/task/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiResponseTask2, TaskModel, TaskModel2} from '../../master/task/task.model';
import {LogErrorService} from '../../master/log-error.service';
import {LogErrorModel} from '../../master/log-error.model';
declare var jQuery: any;

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
  page;
  paramNull = {
    taskDoc: null,
    statusDone: null,
    releaseName: null,
    projectName: null,
    estStartDate: null
  };

  idLog: string;
  logError: LogErrorModel;
  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;


  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute,
              private logErrorService: LogErrorService) {  }

  ngOnInit(): void {
    // this.onGetTaskByUserId();
    
  }

  onGetTaskByUserId() {
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'), this.paramNull, this.page)
      .subscribe((data)  => {
        for (const task of data.content) {
          if (task.statusDone === 'NOT STARTED'){
            this.numberTask = this.numberTask + 1;
          }
        }
      }, error => {
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Get Task By User Id',
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

  editProfile() {
    this.router.navigateByUrl('/user/form-user/' + this.user.id);
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

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
 openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
 closeNav() {
  this.getStyle()


}

getStyle(){
  return {
    'width': '0px;'
  }
}

}
