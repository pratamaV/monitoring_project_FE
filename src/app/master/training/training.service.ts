import { Injectable } from '@angular/core';
import { LogErrorModel } from '../log-error.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogErrorService } from '../log-error.service';
import { DefaultResponse, TrainingModel } from './training.model';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  idLog: string;
  logError: LogErrorModel;

  constructor(private http: HttpClient,
              private logErrorService: LogErrorService) {
  }

  getTrainingByIdUsers(id): Observable<DefaultResponse> {    
    return new Observable((observer: Observer<DefaultResponse>) => {
      this.http
        .get(
          `api/training/users/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (response: DefaultResponse) => {
            observer.next(response);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get training by id users',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          }
        );
    });
  }

  getTrainingByDivision(division): Observable<DefaultResponse> {    
    return new Observable((observer: Observer<DefaultResponse>) => {
      this.http
        .get(
          `api/training/division/${division}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (response: DefaultResponse) => {
            observer.next(response);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get training by division',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          }
        );
    });
  }

  registerTraining(training: any): Observable<DefaultResponse> {    
    console.log('masuk kesini ga?');
    
    return new Observable((observer: Observer<DefaultResponse>) => {
      this.http
      .post(
        `api/training/register?access_token=` +
        JSON.parse(window.sessionStorage.getItem('token')).access_token, training
      )
      .subscribe(
        (response: DefaultResponse) => {
          observer.next(response);
        },
        error => {
          observer.error(error.message);
        }
      );
    });
  }

  getAllTrainingMaster(): Observable<DefaultResponse> {    
    return new Observable((observer: Observer<DefaultResponse>) => {
      this.http
        .get(
          `api/training/master?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (response: DefaultResponse) => {
            observer.next(response);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All training master',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          }
        );
    });
  }

  getTrainingById(id): Observable<DefaultResponse> {    
    return new Observable((observer: Observer<DefaultResponse>) => {
      this.http
        .get(
          `api/training/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (response: DefaultResponse) => {
            observer.next(response);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get training by id',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          }
        );
    });
  }

  getTrainingByType(type): Observable<DefaultResponse> {    
    return new Observable((observer: Observer<DefaultResponse>) => {
      this.http
        .get(
          `api/training/type/${type}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (response: DefaultResponse) => {
            observer.next(response);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get training by type',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
          }
        );
    });
  }


}
