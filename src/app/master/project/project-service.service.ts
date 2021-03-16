import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import {
  DivisionModel,
  ProjectModel,
  ProjectModel2,
  UserModel
} from './project.model';
import { TaskModel } from '../task/task.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  constructor(private http: HttpClient) {}

  getAllProject(): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http
        .get(
          '/api/projects?access_token=' +
            JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }

  getResultProject(param) {
    var divisi =  param.divisi;
    var direktorate = param.direktorate;
    console.log("encode2: ", divisi.replace("&", "%26"));
    console.log(`/api/project?divisiUser=${param.divisi}&directorateUser=${param.direktorate}&pm=${param.userPM}&pmo=${param.userPMO}`);

    // console.log('/api/project?divisiUser=', param.divisi, '&directorateUser=', param.direktorate + '&pm=' + param.userPM + '&pmo=' param.userPMO);
    return new Observable((observer: Observer<any[]>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      this.http.get('/api/project?divisiUser=' + divisi.replace("&", "%26") + '&directorateUser=' + direktorate.replace("&", "%26") + '&pm=' + param.userPM + '&pmo=' + param.userPMO, header).subscribe(
        (data: any[]) => {
          observer.next(data);
        },
        error => {
          observer.error(error.message);
        }
      );
    });
  }

  getAllDivisi(): Observable<any[]> {
    return new Observable((observer: Observer<any[]>) => {
      this.http.get('/api/divisions').subscribe(
        (data: any[]) => {
          observer.next(data);
        },
        error => {
          observer.error(error.message);
        }
      );
    });
  }

  getProjectById(id): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http
        .get(
          `api/project/${id}?access_token=` +
            JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }

  getReleaseByProjectId(id, param): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
      )
    };
    let url = ``;
    if (param.status == null && param.stage == null) {
      url = `api/releaseByProjectId/${id}`;
    } else if (param.stage == null) {
      url = `api/releaseByProjectId/${id}?status=${param.status}`;
    } else if (param.status == null) {
      url = `api/releaseByProjectId/${id}?stage=${param.stage}`;
    } else if (!(param.status == null && param.stage == null)) {
      url = `api/releaseByProjectId/${id}?status=${param.status}&stage=${param.stage}`;
    }
    return new Observable((observer: Observer<any>) => {
      this.http.get(url, header).subscribe(
        (data: any) => {
          observer.next(data);
        },
        error => {
          observer.error(error.message);
        }
      );
    });
  }

  saveProject(postData: ProjectModel2, id: string) {
    return new Observable((observer: Observer<ProjectModel2>) => {
      if (id) {
        this.http
          .put(
            '/api/project?access_token=' +
              JSON.parse(window.sessionStorage.getItem('token')).access_token,
            postData
          )
          .subscribe(
            (response: ProjectModel2) => {
              observer.next(response);
            },
            error => {
              observer.error(error);
            }
          );
      } else {
        this.http
          .post(
            '/api/project?access_token=' +
              JSON.parse(window.sessionStorage.getItem('token')).access_token,
            postData
          )
          .subscribe(
            (response: ProjectModel) => {
              observer.next(response);
            },
            error => {
              observer.error(error);
            }
          );
      }
    });
  }

  getAllUser(): Observable<UserModel[]> {
    return new Observable((observer: Observer<UserModel[]>) => {
      this.http
        .get(
          '/api/users?access_token=' +
            JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: UserModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }

  getAllDivison(): Observable<DivisionModel[]> {
    return new Observable((observer: Observer<DivisionModel[]>) => {
      this.http
        .get(
          '/api/divisions?access_token=' +
            JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: DivisionModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }

  changeStatusProject(id): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http
        .put(
          `/api/project/${id}?access_token=` +
            JSON.parse(window.sessionStorage.getItem('token')).access_token,
          id
        )
        .subscribe(
          (response: ProjectModel) => {
            observer.next(response);
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  getTaskByReleaseId(id): Observable<TaskModel[]> {
    return new Observable((observer: Observer<TaskModel[]>) => {
      this.http
        .get(
          `api/taskByReleaseId/${id}?access_token=` +
            JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: TaskModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }
}
