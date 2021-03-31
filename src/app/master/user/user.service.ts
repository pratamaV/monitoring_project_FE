import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserModel, UserModel2} from './user.model';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(postData: UserModel2, id: string) {
    return new Observable((observer: Observer<UserModel2>) => {
      if (id) {
        this.http.put('/api/user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: UserModel2) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
      } else {
        this.http.post('/api/signup', postData)
          .subscribe((response: UserModel2) => {
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

  getUserById(id): Observable<UserModel> {
    return new Observable((observer: Observer<UserModel>) => {
      this.http.get(`api/user/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: UserModel) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        });
    });
  }

  changeStatusUser(id, status): Observable<UserModel2> {
    const formData = new FormData();
    formData.append('status', status);
    return new Observable((observer: Observer<UserModel2>) => {
      this.http.put(`/api/user/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData)
        .subscribe((response: UserModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }


}
