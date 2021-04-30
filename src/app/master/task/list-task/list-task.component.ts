import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../task.model';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {UserModel} from '../../project/project.model';
import {ProjectServiceService} from '../../project/project-service.service';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import {formatDate} from "@angular/common";
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  filterForm: FormGroup;
  task: TaskModel;
  assigntoId: '';
  loadedTask: TaskModel2[] = [];
  loadedUser: UserModel[] = [];
  paramNull = {
    assignTo: null,
    statusDone: null
  };
  fileName = 'List-Task-' + new Date().toDateString() + '.xlsx';
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  isLoading = true;
  asc = true;
  page = 1;
  pageSize = 10;
  totalItems = 0;
  key: string = 'taskCode';
  reverse: boolean = false;
  pageUser = 1;

  constructor(private taskService: TaskService,
              private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllUser();
    this.onGetAllTask();
  }

  // tslint:disable-next-line:typedef
  sortColumn(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // tslint:disable-next-line:typedef
  onGetAllTask() {
    this.isLoading = true
    this.filterForm.get('assignTo').setValue(null);
    this.filterForm.get('statusDone').setValue(null);
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'), this.paramNull)
      .subscribe(data => {
        this.isLoading = false
        this.loadedTask = data.content;
        this.totalItems= data.totalElements;
      }, error => {
        alert(error);
      });
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetFilterTask(this.filterForm.value);
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

  private buildForm(): void {
    this.filterForm  = new FormGroup({
      assignTo: new FormControl(null),
      statusDone: new FormControl(null),
    });
  }

  form(property): AbstractControl {
    return this.filterForm.get(property);
  }

  // tslint:disable-next-line:typedef
  onGetFilterTask(param) {
    this.isLoading = true
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'), param)
      .subscribe(data => {
        this.isLoading = false
        this.loadedTask = data.content;
        this.totalItems= data.totalElements;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onSaveTaskByReleaseId(){
    this.router.navigate(['/dashboard/task/form-task']);
  }

  // tslint:disable-next-line:typedef
  onDoneTask(task, idRelease){
    this.task = {
      id: task.id,
      taskName: task.taskName,
      taskCode: task.taskCode,
      assignedTo: JSON.stringify({
        id: task.assignedTo.id
      }) ,
      score: task.score,
      weight: task.weight,
      statusDone: 'Ya',
      taskProsentase: task.taskProsentase,
      estStartDate: new Date(task.estStartdate),
      estEndDate: new Date(task.estEndDate),
      actStartDate: new Date(task.actStartDate),
      actEndDate: new Date(task.actEndDate),
      taskDoc: task.taskDoc,
      release: JSON.stringify({
        id: task.release.id
      })
    };
    this.taskService.onDoneTask(this.task, idRelease)
      .subscribe(data => {
        Swal.fire( 'Success', 'Document successfully uploaded' , 'success'  );
        window.location.reload();
      }, error => {
        Swal.fire( 'Failed', 'Failed to upload document, please check your size document' , 'error'  );
      });
  }

  // tslint:disable-next-line:typedef
  downloadTaskDoc(taskCode){
    this.taskService.getTaskDocument(taskCode).subscribe((response) => {
      Swal.fire( 'Success', 'Document successfully downloaded' , 'success'  );
    }, error => {
      Swal.fire( 'Failed', 'Document not available' , 'error'  );
    });
  }

  // tslint:disable-next-line:typedef
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

  goToListRelease() {
    const navigate1 = localStorage.getItem('navigate1');
    if(navigate1 === 'goBackListRelease'){
      this.router.navigate(['/dashboard/release']);
    } else if (navigate1 === 'goReleaseView'){
      this.router.navigate(['dashboard/release/release-view']);
    }
  }

  updateTask(task: TaskModel) {
    this.router.navigateByUrl('/dashboard/task/form-task/' + task.id, {state: task});
  }

  getStyle(estEndDate, statusDone): any {
    if ((estEndDate < this.currentDate) && statusDone === 'NOT STARTED') {
      return {
        'background-color': 'rgb(255, 130, 130)',
        color : 'white'
      };
    } else if ((estEndDate < this.currentDate) && statusDone === 'ON_PROGRESS'){
      return {
        'background-color': 'rgb(255, 200, 97)',
        color : 'black'
      };
    }
  }

  onGoDetailTask(id, param) {
    localStorage.setItem('taskId', id);
    localStorage.setItem('paramnavigatetask', param);
    this.router.navigateByUrl(['/dashboard/task/detail-task/'] + id);
  }

  onGetTaskByIdReleaseSort(orderBy: string, sort: string) {
    this.taskService.getAllTaskByIdReleaseSort(localStorage.getItem('releaseId'), orderBy, sort).subscribe(
      data => {
        this.isLoading = false;
        this.loadedTask = data.content;
        if (sort === 'ASC') {
          this.asc = true;
        } else if (sort === 'DESC') {
          this.asc = false;
        }
      },
      error => {
        alert(error);
      }
    );
  }
}
