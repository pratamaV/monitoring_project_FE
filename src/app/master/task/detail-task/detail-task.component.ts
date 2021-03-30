import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../task.service';
import {TaskModel2} from '../task.model';
import Swal from 'sweetalert2';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileModel} from "../file.model";

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {
  detailmytaskForm: FormGroup;
  myTask: TaskModel2;
  files: FileModel[];
  role: string;

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onGetTaskById();
  }

  private buildForm(): void {
    this.detailmytaskForm = new FormGroup({
      filedesc: new FormControl(null, [Validators.required]),
      taskDoc: new FormControl(null, [Validators.required]),
      statusDone: new FormControl(null),
      prosentase: new FormControl(null, [Validators.required])
    });
  }

  form(property): AbstractControl {
    return this.detailmytaskForm.get(property);
  }

  // tslint:disable-next-line:typedef
  onGetTaskById() {
    this.detailmytaskForm.get('taskDoc').setValue(null);
    this.detailmytaskForm.get('statusDone').setValue(null);
    this.detailmytaskForm.get('prosentase').setValue(null);
    this.taskService.getTaskById(localStorage.getItem('taskId'))
      .subscribe(data => {
        this.myTask = data;
        this.files = this.myTask.fileList;
        console.log(this.files);
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onGolistMyTask() {
    this.router.navigate(['/dashboard/task/my-task']);
  }

  // tslint:disable-next-line:typedef
  processText(param) {
    this.detailmytaskForm.get('prosentase').setValue(param.prosentase);
  }

  // tslint:disable-next-line:typedef
  updateStatusDoneTask(id: string, param: any) {
    this.taskService.updateStatusDoneTask(id, param).subscribe((response) => {
      Swal.fire('Success', 'Berhasil mengubah progress task', 'success');
      this.onGetTaskById();
    }, error => {
      Swal.fire('Failed', 'Gagal mengubah progress task', 'error');
    });
  }

  // tslint:disable-next-line:typedef
  downloadTaskDoc(taskCode) {
    this.taskService.getTaskDocument(taskCode).subscribe((response) => {
      Swal.fire('Success', 'Dokumen berhasil di unduh', 'success');
    }, error => {
      Swal.fire('Failed', 'Dokumen tidak tersedia', 'error');
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
  onUploadDocument(postData, id) {
    console.log(postData);
    console.log(postData.taskDoc.size)
    if (postData.taskDoc.size < 1000000) {
      this.taskService.uploadDocumentTask(postData, id)
        .subscribe(response => {
          Swal.fire('Success', 'Dokumen berhasil di unggah', 'success');
          this.onGetTaskById();
        }, error => {
          Swal.fire('Failed', 'Gagal mengunggah dokumen, cek ukuran dokumen', 'error');
        });
    }else {
      Swal.fire('Failed', 'Gagal mengunggah dokumen, cek ukuran dokumen', 'error');
    }
  }


}
