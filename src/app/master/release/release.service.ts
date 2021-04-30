import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiResponseModel, ProjectModel, ProjectModel2} from '../project/project.model';
import {ApiResponseRelease, ReleaseModel, ReleaseModel2} from './release.model';
import {LogErrorModel} from '../log-error.model';
import {LogErrorService} from '../log-error.service';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  idLog: string;
  logError: LogErrorModel;

  constructor(private http: HttpClient,
              private logErrorService: LogErrorService) {
  }

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


  getReleaseById(id): Observable<ReleaseModel2> {
    return new Observable((observer: Observer<ReleaseModel2>) => {
      this.http.get(`api/release/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: ReleaseModel2) => {
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

  getReleaseByProjectId(id, param, page): Observable<ApiResponseRelease> {
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };

    if (param.userPM === null) {
      param.userPM = '';
    }
    if (param.userPMO === null) {
      param.userPMO = '';
    }
    if (param.userCoPM === null) {
      param.userCoPM = '';
    }
    if (param.stage === null) {
      param.stage = '';
    }
    if (param.status === null) {
      param.status = '';
    }
    if (param.divisi === null) {
      param.divisi = '';
    }
    if (param.directoratUser === null) {
      param.directoratUser = '';
    }
    if (param.projectCode === null || param.projectCode === undefined) {
      param.projectCode = '';
    }
    if (param.projectName === null || param.projectName === undefined) {
      param.projectName = '';
    }
    if (param.developmentMode === null || param.developmentMode === undefined) {
      param.developmentMode = '';
    }
    const url = `/api/releaseByProjectId/${id}?pmId=${param.userPM}&pmoId=${param.userPMO}&copmId=${param.userCoPM}&status=${param.status}&stage=${param.stage}&divisionId=${param.divisi}&directoratUser=${param.directoratUser}&projectCode=${param.projectCode}&projectName=${param.projectName}&developmentMode=${param.developmentMode}&page=${page - 1}`;
    return new Observable((observer: Observer<ApiResponseRelease>) => {
      this.http.get(url, header)
        .pipe(map((responseData: any) => {
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

  getAllReleasePerPage(param, page): Observable<ApiResponseRelease> {
    return new Observable((observer: Observer<ApiResponseRelease>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      if (param.projectName === null) {
        param.projectName = '';
      }
      if (param.userPM === null) {
        param.userPM = '';
      }
      if (param.userPMO === null) {
        param.userPMO = '';
      }
      if (param.userCoPM === null) {
        param.userCoPM = '';
      }
      if (param.stage === null) {
        param.stage = '';
      }
      if (param.status === null) {
        param.status = '';
      }
      if (param.divisi === null) {
        param.divisi = '';
      }
      if (param.directoratUser === null) {
        param.directoratUser = '';
      }
      if (param.developmentMode === null) {
        param.developmentMode = '';
      }

      const url = `/api/releasesPage?projectName=${param.projectName}&pmId=${param.userPM}&pmoId=${param.userPMO}&copmId=${param.userCoPM}&status=${param.status}&stage=${param.stage}&divisionId=${param.divisi}&directoratUser=${param.directoratUser}&developmentMode=${param.developmentMode}&page=${page - 1}`;

      this.http
        .get(url, header)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements,
            numberOfElements: responseData.numberOfElements
          };
          return temp;
        }))
        .subscribe(
          (data: ApiResponseRelease) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All Release-View',
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

  getAllReleaseSearch(projectDependency, projectName): Observable<ApiResponseRelease> {
    return new Observable((observer: Observer<ApiResponseRelease>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      const url = `/api/releases-search?projectDependency=${projectDependency}&projectName=${projectName}`;

      this.http
        .get(url, header)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements,
            numberOfElements: responseData.numberOfElements
          };
          return temp;
        }))
        .subscribe(
          (data: ApiResponseRelease) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All Release-View',
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

  getAllReleaseSort(orderBy, sort): Observable<ApiResponseRelease> {
    return new Observable((observer: Observer<ApiResponseRelease>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      const url = `/api/release-sort?orderBy=${orderBy}&sort=${sort}`;

      this.http
        .get(url, header)
        .pipe(map((responseData: any) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements,
            numberOfElements: responseData.numberOfElements
          };
          return temp;
        }))
        .subscribe(
          (data: ApiResponseRelease) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All Release-View',
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
