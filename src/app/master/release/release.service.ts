import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProjectModel, ProjectModel2} from '../project/project.model';
import {ApiResponseRelease, ReleaseModel, ReleaseModel2} from './release.model';
import {LogErrorModel} from "../log-error.model";
import {LogErrorService} from "../log-error.service";

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  idLog: string;
  logError: LogErrorModel;

  constructor(private http: HttpClient,
              private logErrorService: LogErrorService) { }

  getAllRelease(): Observable<ReleaseModel2[]> {
    return new Observable((observer: Observer<ReleaseModel2[]>) => {
      this.http.get('/api/releases?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get All Release',
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


  getReleaseById(id): Observable<ReleaseModel> {
    return new Observable((observer: Observer<ReleaseModel>) => {
      this.http.get(`api/release/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get Release By Id',
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

  getReleaseByProjectId(id, param): Observable<ApiResponseRelease> {
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
    return new Observable((observer: Observer<ApiResponseRelease>) => {
     this.http.get(url, header)
     .pipe(map((responseData : any) => {
      const temp = {
        content: responseData.content,
        totalPages: responseData.totalPages,
        totalElements: responseData.totalElements,
        numberOfElements: responseData.numberOfElements
      };
      return temp;
    }))
        .subscribe((data: ApiResponseRelease) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get Release By Project Id',
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


  // tslint:disable-next-line:typedef
  saveRelease(postData: ReleaseModel, id: string) {
    return new Observable((observer: Observer<ReleaseModel>) => {
      if (id) {
        this.http.put('/api/release?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: ReleaseModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: '',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Update Release');
              });
          });
      } else {
        this.http.post('/api/release?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: ReleaseModel) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Save Release',
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

  changeStatusRelease(id, releaseStatus): Observable<ReleaseModel> {
    return new Observable((observer: Observer<ReleaseModel>) => {
      this.http.put(`/api/releaseUpdate/${id}?releaseStatus=${releaseStatus}&access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, id)
        .subscribe((response: ReleaseModel) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Change Status Release',
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

  // tslint:disable-next-line:typedef
  getAllRelaseByIdSort(idProject, orderBy, sort) {
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    const url = `api/releaseByProjectId-sort/${idProject}?orderBy=${orderBy}&sort=${sort}`;
    return new Observable((observer: Observer<ReleaseModel2[]>) => {
      this.http.get(url, header)
        .subscribe((data: ReleaseModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'get All Relase By Id Sort',
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
}
