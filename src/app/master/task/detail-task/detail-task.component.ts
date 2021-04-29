import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TaskService} from '../task.service';
import {TaskModel2, TaskModel5} from '../task.model';
import Swal from 'sweetalert2';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileModel} from '../file.model';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {
  detailmytaskForm: FormGroup;
  accept = '*';
  myTask: TaskModel5;
  files: FileModel[];
  role: string;
  fileHolder: File | null;
  isLoading = false;

  constructor(private taskService: TaskService,
              private router: Router) {

      this.fileHolder = null;

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
      prosentase: new FormControl(null, [Validators.required, Validators.pattern('^(?:100|[1-9]?[0-9])$')])
    });
  }



  form(property): AbstractControl {
    return this.detailmytaskForm.get(property);
  }

  // tslint:disable-next-line:typedef
  onGetTaskById() {
    this.isLoading = true;
    this.detailmytaskForm.get('filedesc').setValue(null);
    this.detailmytaskForm.get('taskDoc').setValue(null);
    this.detailmytaskForm.get('statusDone').setValue(null);
    this.detailmytaskForm.get('prosentase').setValue(null);
    this.taskService.getTaskById(localStorage.getItem('taskId'))
      .subscribe(data => {
        this.isLoading = false;
        this.myTask = data;
        this.files = this.myTask.fileList;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onGolistMyTask() {
    const param = localStorage.getItem('paramnavigatetask');
    if (param === 'mylisttask') {
      this.router.navigate(['/dashboard/task/my-task']);
    } else if (param === 'listtask') {
      this.router.navigate(['/dashboard/task']);
    }
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
      this.fileHolder = imageInput.files[0];
      // this.detailmytaskForm.get('taskDoc').setValue(file);
    }
  }

  // onFileChange(event) {
  //   if (event.target.files && event.target.files.length) {
  //     this.fileHolder = event.target.files[0];
  //   }
  // }


  // tslint:disable-next-line:typedef
  onUploadDocument(postData, id) {
    this.isLoading = true;
    if (this.fileHolder.size < 10000000) {
      this.taskService.uploadDocumentTask(this.fileHolder, postData, id)
        .subscribe(response => {
          this.isLoading = false;
          Swal.fire('Success', 'Dokumen berhasil di unggah', 'success');
          this.onGetTaskById();
        }, error => {
          this.isLoading = false;
          Swal.fire('Failed', 'Gagal mengunggah dokumen, cek ukuran dokumen', 'error');
        });
    }else {
      this.isLoading = false;
      Swal.fire('Failed', 'Gagal mengunggah dokumen, cek ukuran dokumen', 'error');
    }
  }

  // tslint:disable-next-line:typedef
  onDeleteDoc(id) {
      Swal.fire({
        title: 'Apa kamu yakin akan menghapus file?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya!',
        cancelButtonText: 'Tidak!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          this.taskService.deleteDoc(id).subscribe((response) => {
            Swal.fire({
              html: 'File Berhasil dihapus.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000
            });
            this.onGetTaskById();
          }, error => {
          Swal.fire('Gagal', 'Gagal menghapus dokumen task', 'error');
        });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire({
            title:  'Cancelled',
            html: 'Your file cancel to delete.',
            icon: 'error',
            showConfirmButton: false,
            timer: 500
          });
        }
      });
  }
}
