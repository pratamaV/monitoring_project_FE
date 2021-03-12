import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {DivisionModel, ProjectModel, ProjectModel2, UserModel} from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  constructor(private http: HttpClient) { }

  getAllProject(): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http.get('/api/projects?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProjectModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getProjectById(id): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http.get(`api/project/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProjectModel) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  saveProject(postData: ProjectModel2, id: string) {
    return new Observable((observer: Observer<ProjectModel2>) => {
      if (id) {
        this.http.put('/api/project?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: ProjectModel2) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/project?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: ProjectModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  getAllUser(): Observable<UserModel[]> {
    return new Observable((observer: Observer<UserModel[]>) => {
      this.http.get('/api/users?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: UserModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllDivison(): Observable<DivisionModel[]> {
    return new Observable((observer: Observer<DivisionModel[]>) => {
      this.http.get('/api/divisions?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: DivisionModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  changeStatusProject(id): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http.put(`/api/project/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((response: ProjectModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }


}
