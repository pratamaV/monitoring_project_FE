import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {ReleaseModel, ReleaseModel2} from '../release/release.model';
import {HttpClient} from '@angular/common/http';
import {TaskModel, TaskModel2} from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTask(): Observable<TaskModel2[]> {
    return new Observable((observer: Observer<TaskModel2[]>) => {
      this.http.get('/api/tasks')
        .subscribe((data: TaskModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  getTaskById(id): Observable<TaskModel2> {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.get(`api/task/${id}`)
        .subscribe((data: TaskModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getTaskByReleaseId(id): Observable<TaskModel2> {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.get(`api/taskByReleaseId/${id}`)
        .subscribe((data: TaskModel2) => {
          console.log(data, "ini yang pertama keluar");
          
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  saveTask(postData: TaskModel, id: string) {
    return new Observable((observer: Observer<TaskModel>) => {
      if (id) {
        this.http.put('/api/task', postData)
          .subscribe((response: TaskModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/task', postData)
          .subscribe((response: TaskModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  createTask(loadData: TaskModel) {
    const formData = new FormData();
    for (const key in loadData){
      formData.append(key, loadData[key]);
    }
    return new Observable((observer) => {
      this.http.post(`api/task`, formData, { responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }

  onDoneTask(loadData, id): Observable<TaskModel2> {
    const formData = new FormData();
    for (const key in loadData){
      formData.append(key, loadData[key]);
    }
    return new Observable((observer) => {
      this.http.put(`api/task/${id}`, formData, { responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }


  getTaskDocument(taskCode): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-task/${taskCode}`, { responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', taskCode);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getTaskByUserId(id): Observable<TaskModel2> {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.get(`api/task/${id}`)
        .subscribe((data: TaskModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }
}
