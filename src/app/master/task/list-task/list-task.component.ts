import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../task.model';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {UserModel} from '../../project/project.model';
import {ProjectServiceService} from '../../project/project-service.service';
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  filterForm: FormGroup;
  task: TaskModel;
  assigntoId: '';
  loadedTask: TaskModel2;
  loadedUser: UserModel[] = [];
  paramNull = {
    assignTo: null,
    statusDone: null
  };
  fileName = 'List-Task-' + new Date().toDateString() + '.xlsx';
  constructor(private taskService: TaskService,
              private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllUser();
    this.onGetAllTask();
  }

  // tslint:disable-next-line:typedef
  onGetAllTask() {
    this.filterForm.get('assignTo').setValue(null);
    this.filterForm.get('statusDone').setValue(null);
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'), this.paramNull)
      .subscribe(data => {
        this.loadedTask = data;
        console.log(this.loadedTask);
      }, error => {
        alert(error);
      });
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
    console.log(param);
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'), param)
      .subscribe(data => {
        this.loadedTask = data;
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
      finalTarget: new Date(task.finalTarget),
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
      Swal.fire( 'Failed', 'Failed to download document' , 'error'  );
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
}
