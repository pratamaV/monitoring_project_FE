import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskModel2} from '../task.model';
import {TaskService} from '../task.service';
import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import {UserService} from "../../user/user.service";
import {UserModel} from "../../user/user.model";
import {ProjectServiceService} from "../../project/project-service.service";
import {ProjectModel} from "../../project/project.model";

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {

  user: UserModel;
  loadedTask: TaskModel2[] = [];
  loadedProject: ProjectModel[] = [];
  fileName = 'List-Task-' + new Date().toDateString() + '.xlsx';
  paramNull = {
    taskDoc: null,
    statusDone: null,
    releaseName: null,
    projectName: null,
    estStartDate: null
  };

  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private taskService: TaskService,
              private router: Router,
              private userService: UserService,
              private projectService: ProjectServiceService) {
  }

  ngOnInit(): void {
    this.onGetUserById();
  }

  onGetUserById() {
    this.userService.getUserById(localStorage.getItem('userIdTask'))
      .subscribe(data => {
        this.user = data;
        this.taskService.getTaskByUserId(localStorage.getItem('userIdTask'), this.paramNull, this.page)
          .subscribe(data2 => {
            this.loadedTask = data2.content;
          }, error => {
            alert(error);
          });


        // if (this.user.userRole === '03') {
        //   this.projectService.getProjectBycoPMId(localStorage.getItem('userIdTask'))
        //     .subscribe(data3 => {
        //       this.loadedProject = data3;
        //     }, error => {
        //       alert(error);
        //     });
        // } else if (this.user.userRole === '02') {
        //   this.projectService.getProjectByPMId(localStorage.getItem('userIdTask'))
        //     .subscribe(data4 => {
        //       this.loadedProject = data4;
        //     }, error => {
        //       alert(error);
        //     });
        // } else if (this.user.userRole === '01') {
        //   this.projectService.getProjectByPMOId(localStorage.getItem('userIdTask'))
        //     .subscribe(data5 => {
        //       this.loadedProject = data5;
        //     }, error => {
        //       alert(error);
        //     });
        // }
      }, error => {
        alert(error);
      });
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetUserById();
  }

  // onGetTaskByUserId() {
  //   const assignedTo = localStorage.getItem('userIdTask');
  //   this.taskService.getTaskByUserId(localStorage.getItem('userIdTask'))
  //     .subscribe(data => {
  //       this.loadedTask = data;
  //     }, error => {
  //       alert(error);
  //     });
  // }

  exportexcel() {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  downloadTaskDoc(taskDocument: string) {
    this.taskService.getTaskDocument(taskDocument).subscribe((response) => {
      Swal.fire('Success', 'Document successfully downloaded', 'success');
    }, error => {
      Swal.fire('Failed', 'Document not available', 'error');
    });
  }

  goToListUser() {
    this.router.navigate(['/dashboard/user']);
  }
}
