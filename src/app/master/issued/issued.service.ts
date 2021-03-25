import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Observer} from "rxjs";
import {TaskModel2} from "../task/task.model";
import {IssuedModel, IssuedModel2} from "./issued.model";
import {ProjectModel, ProjectModel2} from "../project/project.model";

@Injectable({
  providedIn: 'root'
})
export class IssuedService {

  constructor(private http: HttpClient) { }

  getAllIssued(): Observable<IssuedModel2[]> {
    return new Observable((observer: Observer<IssuedModel2[]>) => {
      this.http.get('/api/issueds?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: IssuedModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getIssuedById(id): Observable<IssuedModel2> {
    return new Observable((observer: Observer<IssuedModel2>) => {
      this.http.get(`api/issued/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: IssuedModel2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  getIssuedByReleaseId(id): Observable<IssuedModel2[]> {
    return new Observable((observer: Observer<IssuedModel2[]>) => {
      this.http.get(`api/issuedByReleaseId/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: IssuedModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  saveIssued(postData: IssuedModel, id: string) {
    return new Observable((observer: Observer<IssuedModel>) => {
      if (id) {
        this.http.put('/api/issued?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: IssuedModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/issued?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: IssuedModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }
}
