import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {ProjectModel, ProjectModel2} from "../project/project.model";
import {ReleaseModel, ReleaseModel2} from './release.model';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(private http: HttpClient) { }

  getAllRelease(): Observable<ReleaseModel2[]> {
    return new Observable((observer: Observer<ReleaseModel2[]>) => {
      this.http.get('/api/releases')
        .subscribe((data: ReleaseModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  getReleaseById(id): Observable<ReleaseModel> {
    return new Observable((observer: Observer<ReleaseModel>) => {
      this.http.get(`api/release/${id}`)
        .subscribe((data: ReleaseModel) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getReleaseByProjectId(id): Observable<ReleaseModel2> {
    return new Observable((observer: Observer<ReleaseModel2>) => {
      this.http.get(`api/releaseByProjectId/${id}`)
        .subscribe((data: ReleaseModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }


  saveRelease(postData: ReleaseModel, id: string) {
    return new Observable((observer: Observer<ReleaseModel>) => {
      if (id) {
        this.http.put('/api/release', postData)
          .subscribe((response: ReleaseModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/release', postData)
          .subscribe((response: ReleaseModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  changeStatusRelease(id): Observable<ReleaseModel> {
    return new Observable((observer: Observer<ReleaseModel>) => {
      this.http.put(`/api/releaseUpdate/${id}`, id)
        .subscribe((response: ReleaseModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }
}
