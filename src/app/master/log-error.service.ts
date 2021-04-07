import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {LogErrorModel} from "./log-error.model";

@Injectable({
  providedIn: 'root'
})
export class LogErrorService {

  constructor(private http: HttpClient) { }

  saveLogError(postData: LogErrorModel, id: string) {
    return new Observable((observer: Observer<LogErrorModel>) => {
      if (id) {
        this.http.put('/api/logerror?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: LogErrorModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/logerror?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: LogErrorModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      }
    });
  }

  getAllLogError(): Observable<LogErrorModel[]> {
    return new Observable((observer: Observer<LogErrorModel[]>) => {
      this.http
        .get(
          '/api/logerrors?access_token=' +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: LogErrorModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }

  getLogErrorById(id): Observable<LogErrorModel> {
    return new Observable((observer: Observer<LogErrorModel>) => {
      this.http
        .get(
          `api/logerror/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: LogErrorModel) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
          }
        );
    });
  }

}
