import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2, TaskModel3, TaskModel4} from '../task.model';
import {FormControl, FormGroup} from '@angular/forms';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import {ProjectServiceService} from '../../project/project-service.service';
import {UserModel} from '../../project/project.model';


@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskForm: FormGroup;
  loadedTask: TaskModel2[] = [];
  task: TaskModel4;
  paramNull = {
    taskDoc: null,
    statusDone: null,
    releaseName: null,
    projectName: null,
    estStartDate: null
  };
  role: string;
  fileName = 'List-MyTask-' + new Date().toDateString() + '.xlsx';
  constructor(private taskService: TaskService,
              private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.role = localStorage.getItem('role');
    this.onGetTaskByUserId();

  }

  private buildForm(): void {
    this.taskForm  = new FormGroup({
      taskDoc: new FormControl(null),
      statusDone: new FormControl(null),
      releaseName: new FormControl(null),
      projectName: new FormControl(null),
      estStartDate: new FormControl(null),
      estEndDate: new FormControl(null),
      prosentase: new FormControl(null)
    });
  }

  // tslint:disable-next-line:typedef
  onGetTaskByUserId() {
    this.taskForm.get('taskDoc').setValue(null);
    this.taskForm.get('statusDone').setValue(null);
    this.taskForm.get('releaseName').setValue(null);
    this.taskForm.get('projectName').setValue(null);
    this.taskForm.get('estStartDate').setValue(null);
    this.taskForm.get('estEndDate').setValue(null);
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'), this.paramNull)
      .subscribe(data => {
        this.loadedTask = data;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onGetTaskByUserIdFilter(param) {
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'), param)
      .subscribe(data => {
        this.loadedTask = data;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onDoneTask(task, idRelease){
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
        Swal.fire( 'Success', 'Your task successfully updated' , 'success'  );
        window.location.reload();
      }, error => {
        alert(error.message);
      });
  }

  // tslint:disable-next-line:typedef
  onUploadDocument(postData, valid: boolean, id){
    if (valid) {
      this.taskService.uploadDocumentTask(postData, id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Document successfully uploaded' , 'success'  );
          window.location.reload();
        }, error => {
          Swal.fire( 'Failed', 'Failed to upload document, please check your size document' , 'error'  );
        });
    }
  }

  // tslint:disable-next-line:typedef
  processFile(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.taskForm.get('taskDoc').setValue(file);
    }
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

  // tslint:disable-next-line:typedef
  updateStatusDoneTask(id: string, param: any) {
    this.taskService.updateStatusDoneTask(id, param).subscribe((response) => {
      Swal.fire( 'Success', 'Update Status Task successfully' , 'success'  );
    }, error => {
      Swal.fire( 'Failed', 'Update Status Task failed' , 'error'  );
    });
  }

  processText(param) {
    this.taskForm.get('prosentase').setValue(param.prosentase);
  }

  onGoDetailTask(id: string) {
    this.router.navigateByUrl(['/dashboard/task/detail-task/'] + id);
  }
}
