import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {ProjectModel, ProjectModel2} from '../project/project.model';
import {ReleaseModel, ReleaseModel2} from './release.model';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(private http: HttpClient) { }

  getAllRelease(): Observable<ReleaseModel2[]> {
    return new Observable((observer: Observer<ReleaseModel2[]>) => {
      this.http.get('/api/releases?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  getReleaseById(id): Observable<ReleaseModel> {
    return new Observable((observer: Observer<ReleaseModel>) => {
      this.http.get(`api/release/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getReleaseByProjectId(id, param): Observable<ReleaseModel2> {
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    let url = ``;
    if (param.status == null && param.stage == null){
        url = `api/releaseByProjectId/${id}`;
    }
    else if (param.stage == null){
        url = `api/releaseByProjectId/${id}?status=${param.status}`;
    }
    else if (param.status == null){
        url = `api/releaseByProjectId/${id}?stage=${param.stage}`;
    }
    else if (!(param.status == null && param.stage == null)){
      url = `api/releaseByProjectId/${id}?status=${param.status}&stage=${param.stage}`;
    }
    return new Observable((observer: Observer<ReleaseModel2>) => {
// <<<<<<< HEAD
      this.http.get(url, header)
// =======
//       this.http.get(`api/releaseByProjectId/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
// >>>>>>> 5c0ab1f9455636c7b71c7427e7a3b87ddf7b68fa
        .subscribe((data: ReleaseModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  // tslint:disable-next-line:typedef
  saveRelease(postData: ReleaseModel, id: string) {
    return new Observable((observer: Observer<ReleaseModel>) => {
      if (id) {
        this.http.put('/api/release?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: ReleaseModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/release?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: ReleaseModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  changeStatusRelease(id, releaseStatus): Observable<ReleaseModel> {
    return new Observable((observer: Observer<ReleaseModel>) => {
      this.http.put(`/api/releaseUpdate/${id}?releaseStatus=${releaseStatus}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((response: ReleaseModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }
}
