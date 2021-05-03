import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiResponseUser, UserModel, UserModel2, UserModelPojo} from './user.model';
import {formatDate} from "@angular/common";
import {map} from 'rxjs/operators';
import {LogErrorModel} from "../log-error.model";
import {LogErrorService} from "../log-error.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  idLog: string;
  logError: LogErrorModel;

  constructor(private http: HttpClient,
              private logErrorService: LogErrorService) { }

  saveUser(postData: UserModel2, userPojo: UserModelPojo, id: string) {
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    return new Observable((observer: Observer<UserModel2>) => {
      if (id) {
        this.http.put('/api/user-update/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, userPojo)
          .subscribe((response: UserModel2) => {
            observer.next(response);
          }, (error) => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Update User',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          });
      } else {
        this.http.post('/api/signup', postData)
          .subscribe((response: UserModel2) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Save User',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          });
      }
    });
  }

  getAllUser(username, orderBy, sort, page): Observable<ApiResponseUser> {
    return new Observable((observer: Observer<ApiResponseUser>) => {
      this.http.get(`/api/users?page=${page - 1}&username=${username}&orderBy=${orderBy}&sort=${sort}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      .pipe(map((responseData : any) => {
        const temp = {
          content: responseData.content,
          totalPages: responseData.totalPages,
          totalElements: responseData.totalElements,
          numberOfElements: responseData.numberOfElements
        };
        return temp;
      }))
      .subscribe((data: ApiResponseUser) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Get All User',
          isActive: true
        };
        this.logErrorService.saveLogError(this.logError, this.idLog)
          .subscribe(response => {
            // tslint:disable-next-line:no-shadowed-variable
          }, error => {
            alert('Gagal merekam kesalahan');
          });
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
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get User By Id',
            isActive: true
          };
          this.logErrorService.saveLogError(this.logError, this.idLog)
            .subscribe(response => {
              // tslint:disable-next-line:no-shadowed-variable
            }, error => {
              alert('Gagal merekam kesalahan');
            });
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
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Change Status User',
            isActive: true
          };
          this.logErrorService.saveLogError(this.logError, this.idLog)
            .subscribe(response => {
              // tslint:disable-next-line:no-shadowed-variable
            }, error => {
              alert('Gagal merekam kesalahan');
            });
        });
    });
  }


  changePassword(id, param): Observable<UserModel2> {
    const formData = new FormData();
    formData.append('oldPassword', param.oldPasswordChange);
    formData.append('newPassword', param.newPasswordChange);
    return new Observable((observer: Observer<UserModel2>) => {
      this.http.put(`/api/userChangePassword/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData)
        .subscribe((response: UserModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }
}
