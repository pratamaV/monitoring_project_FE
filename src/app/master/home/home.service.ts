import { Injectable } from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {TaskModel} from '../task/task.model';
import {HttpClient} from '@angular/common/http';
import {ReleaseModel, ReleaseModel2} from '../release/release.model';
import {ProjectModel} from '../project/project.model';
import {UserModel} from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getProjectByDivisiUser(divisiUser, statusProject): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http.get(`api/projectByDivision?${divisiUser}&${statusProject}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProjectModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getProjectByDirectorateUser(directorateUser): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http.get(`api/projectByDirectorateUser?directorateUser=${directorateUser}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProjectModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getProjectByBebanUsaha(): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http.get(`api/projectByBebanUsaha?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProjectModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  getProjectByBelanjaModal(): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http.get(`api/projectByBelanjaModal?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ProjectModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  getReleaseByStage(stage): Observable<ReleaseModel2[]> {
    return new Observable((observer: Observer<ReleaseModel2[]>) => {
      this.http.get(`api/releasesByStage/${stage}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllRelease(): Observable<ReleaseModel2[]> {
    return new Observable((observer: Observer<ReleaseModel2[]>) => {
      this.http.get(`api/releases?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getAllUserByPerformance(): Observable<UserModel[]> {
    return new Observable((observer: Observer<UserModel[]>) => {
      this.http.get(`api/userByPerformance?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: UserModel[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }
}
