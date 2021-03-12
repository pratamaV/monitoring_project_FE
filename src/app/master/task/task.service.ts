import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {ReleaseModel, ReleaseModel2} from '../release/release.model';
import {HttpClient} from '@angular/common/http';
import {TaskModel, TaskModel2, TaskModel3} from './task.model';
import {ProjectModel, ProjectModel2} from "../project/project.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAllTask(): Observable<TaskModel2[]> {
    return new Observable((observer: Observer<TaskModel2[]>) => {
      this.http.get('/api/tasks?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  addTask(postData: TaskModel3, id: string) {
    return new Observable((observer: Observer<TaskModel3>) => {
      if (id) {
        this.http.put('/api/task?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: TaskModel3) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/addTask?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: TaskModel3) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }


  getTaskById(id): Observable<TaskModel2> {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.get(`api/task/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getTaskByReleaseId(id): Observable<TaskModel2> {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.get(`api/taskByReleaseId/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel2) => {
          console.log(data);
          
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  saveTask(postData: TaskModel, id: string) {
    return new Observable((observer: Observer<TaskModel>) => {
      if (id) {
        this.http.put('/api/task?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: TaskModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/task?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
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
      this.http.post(`api/task?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData, { responseType: 'text'})
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
      this.http.put(`api/task/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData, { responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }


  getTaskDocument(taskCode): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-task/${taskCode}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, { responseType: 'blob' as 'json'})
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
      this.http.get(`api/taskByUserId/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }
}
