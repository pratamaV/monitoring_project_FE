import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TaskModel, TaskModel2, TaskModel3} from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

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

  getAllTaskDeadline(): Observable<TaskModel2[]> {
    return new Observable((observer: Observer<TaskModel2[]>) => {
      this.http.get('/api/taskDeadline?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
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

  getTaskByReleaseId(id, param): Observable<TaskModel2> {
    let url = ``;
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    if (param.assignTo == null && param.statusDone == null) {
      url = `api/taskByReleaseId/${id}`;
    } else if (param.statusDone == null) {
      url = `api/taskByReleaseId/${id}?assignTo=${param.assignTo}`;
    } else if (param.assignTo == null) {
      url = `api/taskByReleaseId/${id}?statusDone=${param.statusDone}`;
    } else if (!(param.assignTo == null && param.statusDone == null)) {
      url = `api/taskByReleaseId/${id}?assignTo=${param.assignTo}&statusDone=${param.statusDone}`;
    }
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.get(url, header)
        .subscribe((data: TaskModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  createTask(loadData: TaskModel) {
    const formData = new FormData();
    for (const key in loadData) {
      formData.append(key, loadData[key]);
    }
    return new Observable((observer) => {
      this.http.post(`api/task?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData, {responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }

  onDoneTask(loadData, id): Observable<TaskModel2> {
    return new Observable((observer) => {
      this.http.put(`api/doneTask/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, loadData)
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }


  getTaskDocument(taskCode): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(`api/document-task/${taskCode}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, {responseType: 'blob' as 'json'})
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

  getTaskByUserId(id, param): Observable<TaskModel2[]> {
    const estStartDateString = param.estStartDate;
    const estEndDateString = param.estEndDate;
    // if (param.estStartDate != null) {
    //   estStartDateString = this.datepipe.transform(param.estStartDate, 'yyyy-MM-dd');
    // }
    // if (param.estEndDate != null) {
    //   estEndDateString = this.datepipe.transform(param.estEndDate, 'yyyy-MM-dd');
    // }
    let url = ``;
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };

    // tslint:disable-next-line:max-line-length
    if (param.statusDone == null && param.releaseName == null && param.projectName == null && param.estStartDate == null && param.estEndDate == null) {
      url = `api/taskByUserId/${id}`;
    } else if (param.statusDone != null && param.releaseName != null && param.projectName != null
      && param.estStartDate != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}&estEndDate=${estEndDateString}&statusDone=${param.statusDone}`;
    } else if (param.releaseName != null && param.projectName != null && param.estStartDate != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}&estEndDate=${estEndDateString}`;
    } else if (param.statusDone != null && param.releaseName != null && param.projectName != null
      && param.estStartDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}&statusDone=${param.statusDone}`;
    } else if (param.releaseName != null && param.projectName != null && param.estStartDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}`;
    } else if (param.releaseName != null && param.projectName != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estEndDate=${estEndDateString}`;
    } else if (param.projectName != null && param.estStartDate != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?projectName=${param.projectName}&estStartDate=${estStartDateString}&estEndDate=${estEndDateString}`;
    } else if (param.statusDone != null && param.projectName != null && param.estStartDate != null) {
      url = `api/taskByUserId/${id}?projectName=${param.projectName}&estStartDate=${estStartDateString}&statusDone=${param.statusDone}`;
    } else if (param.statusDone != null && param.estStartDate != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}&estEndDate=${estEndDateString}&statusDone=${param.statusDone}`;
    } else if (param.releaseName != null && param.projectName != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}`;
    } else if (param.releaseName != null && param.estStartDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&estStartDate=${estStartDateString}`;
    } else if (param.releaseName != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&estEndDate=${estEndDateString}`;
    } else if (param.statusDone != null && param.releaseName != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&statusDone=${param.statusDone}`;
    } else if (param.projectName != null && param.estStartDate != null) {
      url = `api/taskByUserId/${id}?projectName=${param.projectName}&estStartDate=${estStartDateString}`;
    } else if (param.projectName != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?projectName=${param.projectName}&estEndDate=${estEndDateString}`;
    } else if (param.statusDone != null &&  param.projectName != null) {
      url = `api/taskByUserId/${id}?projectName=${param.projectName}&statusDone=${param.statusDone}`;
    } else if (param.estStartDate != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}&estEndDate=${estEndDateString}`;
    } else if (param.statusDone != null && param.estStartDate != null) {
      url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}&statusDone=${param.statusDone}`;
    } else if (param.statusDone != null && param.estEndDate != null) {
      url = `api/taskByUserId/${id}?estEndDate=${estEndDateString}&statusDone=${param.statusDone}`;
    } else if (param.releaseName != null) {
      url = `api/taskByUserId/${id}?releaseName=${param.releaseName}`;
    } else if ( param.projectName != null) {
      url = `api/taskByUserId/${id}?projectName=${param.projectName}`;
    } else if (param.estStartDate != null) {
      url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}`;
    }else if (param.estEndDate != null) {
      url = `api/taskByUserId/${id}?estEndDate=${estEndDateString}`;
    }else if (param.statusDone != null ) {
      url = `api/taskByUserId/${id}?statusDone=${param.statusDone}`;
    }
    return new Observable((observer: Observer<TaskModel2[]>) => {
      this.http.get(url, header)
        .subscribe((data: TaskModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  // tslint:disable-next-line:typedef
  uploadDocumentTask(postData, id: string) {
    const formData = new FormData();
    for (const key in postData) {
      formData.append(key, postData[key]);
    }
    return new Observable((observer) => {
      this.http.put(`api/uploadTaskDoc/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData, {responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
    });
  }


  doneTask(id: string, postData) {
    console.log('masuk yuk');
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.put(`/api/doneTask/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
        .subscribe((response: TaskModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  updateStatusDoneTask(id: string, param: any) {
    const prosentase = param.prosentase / 100;
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    console.log(prosentase);
    const formData = new FormData();
    // @ts-ignore
    formData.append('prosentase', prosentase);
    const url = `/api/doneTaskNew/${id}`;
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.put(url, formData, header)
        .subscribe((response: TaskModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }
}
