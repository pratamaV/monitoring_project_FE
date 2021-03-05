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
      this.http.get('/api/projects')
        .subscribe((data: ProjectModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getProjectById(id): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http.get(`api/project/${id}`)
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
        this.http.put('/api/project', postData)
          .subscribe((response: ProjectModel2) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/project', postData)
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
      this.http.get('/api/users')
        .subscribe((data: UserModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllDivison(): Observable<DivisionModel[]> {
    return new Observable((observer: Observer<DivisionModel[]>) => {
      this.http.get('/api/divisions')
        .subscribe((data: DivisionModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


}
