import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2, TaskModel3, TaskModel4} from '../task.model';
import {FormControl, FormGroup} from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import {ProjectServiceService} from '../../project/project-service.service';
import {formatDate} from '@angular/common';
import { ReleaseService } from '../../release/release.service';
import { ReleaseModel2 } from '../../release/release.model';


@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskForm: FormGroup;
  loadedTask: TaskModel2[] = [];
  task: TaskModel4;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  paramNull = {
    statusDone: '',
    releaseName: '',
    projectName: '',
    estStartDateFrom: '',
    estEndDateFrom: '',
    estStartDateTo: '',
    estEndDateTo: ''
  };
  key: string = 'taskCode';
  reverse: boolean = false;

  projectDependency='';

  role: string;
  fileName = 'List-MyTask-' + new Date().toDateString() + '.xlsx';
  projectName: any[] = [];
  releaseName: any[] = [];
  asc = true;
  isLoading = false;

  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private taskService: TaskService,
              private projectService: ProjectServiceService,
              private releaseService: ReleaseService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.role = localStorage.getItem('role');
    this.onGetTaskByUserId();
    this.getAllProjectName();
    this.getAllReleaseName();
  }

  sortColumn(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  private buildForm(): void {
    this.taskForm = new FormGroup({
      statusDone: new FormControl(null),
      releaseName: new FormControl(null),
      projectName: new FormControl(null),
      estStartDateFrom: new FormControl(null),
      estEndDateFrom: new FormControl(null),
      estStartDateTo: new FormControl(null),
      estEndDateTo: new FormControl(null)
    });
  }

  // tslint:disable-next-line:typedef
  onGetTaskByUserId() {
    this.isLoading = true;
    // this.taskForm.get('taskDoc').setValue(null);
    this.taskForm.get('statusDone').setValue(null);
    this.taskForm.get('releaseName').setValue(null);
    this.taskForm.get('projectName').setValue(null);
    this.taskForm.get('estStartDateFrom').setValue(null);
    this.taskForm.get('estEndDateFrom').setValue(null);
    this.taskForm.get('estStartDateTo').setValue(null);
    this.taskForm.get('estEndDateTo').setValue(null);
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'), this.paramNull, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedTask = data.content;    
        this.totalItems = data.totalElements;
        for (const iterator of this.loadedTask) {
          this.releaseName.push(iterator.release.releaseName);
        }
      }, error => {
        alert(error);
      });
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetTaskByUserIdFilter(this.taskForm.value);
  }

  // tslint:disable-next-line:typedef
  onGetTaskByUserIdFilter(param) {
    this.isLoading = true
        this.taskService.getTaskByUserId(localStorage.getItem('idUser'), param, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedTask = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onDoneTask(task, idRelease) {
    this.task = {
      id: task.id,
      taskName: task.taskName,
      taskCode: task.taskCode,
      assignedTo: {
        id: task.assignedTo.id
      },
      score: task.score,
      weight: task.weight,
      statusDone: 'Ya',
      taskProsentase: task.taskProsentase,
      estStartDate: new Date(task.estStartDate),
      estEndDate: new Date(task.estEndDate),
      actStartDate: new Date(task.actStartDate),
      actEndDate: new Date(task.actEndDate),
      taskDocument: task.taskDocument,
      release: {
        id: task.release.id
      }
    };
    this.taskService.onDoneTask(this.task, idRelease)
      .subscribe(data => {
        Swal.fire('Success', 'Task berhasil di update', 'success');
        window.location.reload();
      }, error => {
        alert(error.message);
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


  // tslint:disable-next-line:typedef
  onGoDetailTask(id: string, param) {
    localStorage.setItem('taskId', id);
    localStorage.setItem('paramnavigatetask', param);
    this.router.navigateByUrl(['/dashboard/task/detail-task/'] + id);
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

  getAllReleaseName(){
    this.releaseService.getAllRelease()
    .subscribe(data => {
      this.releaseName = data;
    }, error => {
      alert(error);
    });
  }

  // tslint:disable-next-line:typedef
  getAllProjectName() {
    this.projectService.getProjects()
      .subscribe(data => {
        this.projectName = data;
      }, error => {
        alert(error);
      });
  }

  // onGetTaskByIdUserSort(orderBy: string, sort: string) {
  //   this.taskService.getAllTaskByIdUserSort(localStorage.getItem('idUser'), orderBy, sort).subscribe(
  //     data => {
  //       this.isLoading = false;
  //       this.loadedTask = data.content;
  //       if (sort === 'ASC') {
  //         this.asc = true;
  //       } else if (sort === 'DESC') {
  //         this.asc = false;
  //       }
  //     },
  //     error => {
  //       alert(error);
  //     }
  //   );
  // }

}
