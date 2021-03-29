import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../task.service';
import {TaskModel2} from '../task.model';
import Swal from 'sweetalert2';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {
  detailmytaskForm: FormGroup;
  myTask: TaskModel2;
  role: string;

  constructor(private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetTaskById();
  }

  // tslint:disable-next-line:typedef
  onGetTaskById() {
    this.taskService.getTaskById(localStorage.getItem('taskId'))
      .subscribe(data => {
        this.myTask = data;
        console.log(this.myTask);
      }, error => {
        alert(error);
      });
  }
  // tslint:disable-next-line:typedef
  onGolistMyTask() {
    this.router.navigate(['/dashboard/task/my-task']);
  }
  processText(param) {
    this.detailmytaskForm.get('prosentase').setValue(param.prosentase);
  }

  // tslint:disable-next-line:typedef
  updateStatusDoneTask(id: string, param: any) {
    this.taskService.updateStatusDoneTask(id, param).subscribe((response) => {
      Swal.fire( 'Success', 'Berhasil mengubah progress task' , 'success'  );
    }, error => {
      Swal.fire( 'Failed', 'Gagal mengubah progress task' , 'error'  );
    });
  }

  // tslint:disable-next-line:typedef
  downloadTaskDoc(taskCode){
    this.taskService.getTaskDocument(taskCode).subscribe((response) => {
      Swal.fire( 'Success', 'Dokumen berhasil di unduh' , 'success'  );
    }, error => {
      Swal.fire( 'Failed', 'Dokumen tidak tersedia' , 'error'  );
    });
  }

  // tslint:disable-next-line:typedef
  processFile(imageInput: any) {
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      this.detailmytaskForm.get('taskDoc').setValue(file);
    }
  }

  // tslint:disable-next-line:typedef
  onUploadDocument(postData, valid: boolean, id){
    if (valid) {
      this.taskService.uploadDocumentTask(postData, id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Dokumen berhasil di unggah' , 'success'  );
          window.location.reload();
        }, error => {
          Swal.fire( 'Failed', 'Gagal mengunggah dokumen, cek ukuran dokumen' , 'error'  );
        });
    }
  }

  private buildForm(): void {
    this.buildForm();
    this.detailmytaskForm  = new FormGroup({
      taskDoc: new FormControl(null),
      statusDone: new FormControl(null),
    });
  }
}
