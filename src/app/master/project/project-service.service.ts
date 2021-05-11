import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  ApiResponseModel,
  DivisionModel,
  ProjectModel,
  ProjectModel2,
  UserModel
} from './project.model';
import {TaskModel} from '../task/task.model';
import {LogErrorModel} from '../log-error.model';
import {LogErrorService} from '../log-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  idLog: string;
  logError: LogErrorModel;

  constructor(private http: HttpClient,
              private logErrorService: LogErrorService) {
  }


  getAllProject(projectDependency, projectName, orderBy, sort, page): Observable<ApiResponseModel> {
    return new Observable((observer: Observer<ApiResponseModel>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      const url = `/api/projects-page?page=${page - 1}&projectDependency=${projectDependency}&projectName=${projectName}&orderBy=${orderBy}&sort=${sort}`;

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
          (data: ApiResponseModel) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All Project',
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


  getAllDivisi(): Observable<any[]> {
    return new Observable((observer: Observer<any[]>) => {
      this.http.get('/api/divisions').subscribe(
        (data: any[]) => {
          observer.next(data);
        },
        error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get All Division',
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

  getProjects(): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http
        .get(
          `api/projects-list?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Projects',
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

  getProjectById(id): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http
        .get(
          `api/project/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Project By Id',
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


  getProjectByPMId(id): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http
        .get(
          `api/projectByPM/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Project By PM Id',
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

  getProjectByPMOId(id): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http
        .get(
          `api/projectByPMO/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Project By PMO Id',
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

  getProjectBycoPMId(id): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http
        .get(
          `api/projectBycoPM/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Project By coPM Id',
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

  getReleaseByProjectId(id, param): Observable<any> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' +
        JSON.parse(window.sessionStorage.getItem('token')).access_token
      )
    };
    let url = ``;
    if (param.status == null && param.stage == null) {
      url = `api/releaseByProjectId/${id}`;
    } else if (param.stage == null) {
      url = `api/releaseByProjectId/${id}?status=${param.status}`;
    } else if (param.status == null) {
      url = `api/releaseByProjectId/${id}?stage=${param.stage}`;
    } else if (!(param.status == null && param.stage == null)) {
      url = `api/releaseByProjectId/${id}?status=${param.status}&stage=${param.stage}`;
    }
    return new Observable((observer: Observer<any>) => {
      this.http.get(url, header).subscribe(
        (data: any) => {
          observer.next(data);
        },
        error => {
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
        }
      );
    });
  }

  saveProject(postData: ProjectModel2, id: string) {
    return new Observable((observer: Observer<ProjectModel2>) => {
      if (id) {
        this.http
          .put(
            '/api/project?access_token=' +
            JSON.parse(window.sessionStorage.getItem('token')).access_token,
            postData
          )
          .subscribe(
            (response: ProjectModel2) => {
              observer.next(response);
            },
            error => {
              observer.error(error);
              this.logError = {
                errorMessage: error.message,
                incidentDate: new Date(),
                function: 'Update Project',
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
      } else {
        this.http
          .post(
            '/api/project?access_token=' +
            JSON.parse(window.sessionStorage.getItem('token')).access_token,
            postData
          )
          .subscribe(
            (response: ProjectModel) => {
              observer.next(response);
            },
            error => {
              observer.error(error);
              this.logError = {
                errorMessage: error.message,
                incidentDate: new Date(),
                function: 'Save Project',
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
      }
    });
  }

  getAllUser(): Observable<UserModel[]> {
    return new Observable((observer: Observer<UserModel[]>) => {
      this.http
        .get(
          '/api/users-list?access_token=' +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: UserModel[]) => {
            observer.next(data);
          },
          error => {
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
          }
        );
    });
  }

  getAllDivison(): Observable<DivisionModel[]> {
    return new Observable((observer: Observer<DivisionModel[]>) => {
      this.http
        .get(
          '/api/divisions?access_token=' +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: DivisionModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All Division',
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

  changeStatusProject(id, projectStatus): Observable<ProjectModel> {
    return new Observable((observer: Observer<ProjectModel>) => {
      this.http
        .put(
          `/api/project/${id}?projectStatus=${projectStatus}&access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token,
          id
        )
        .subscribe(
          (response: ProjectModel) => {
            observer.next(response);
          },
          error => {
            observer.error(error);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Change Status Project',
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

  getTaskByReleaseId(id): Observable<TaskModel[]> {
    return new Observable((observer: Observer<TaskModel[]>) => {
      this.http
        .get(
          `api/taskByReleaseId/${id}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: TaskModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Task By Release Id',
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

  getProjectByKeyword(keyword): Observable<ProjectModel[]> {
    return new Observable((observer: Observer<ProjectModel[]>) => {
      this.http
        .get(
          `api/projectByKeyword/${keyword}?access_token=` +
          JSON.parse(window.sessionStorage.getItem('token')).access_token
        )
        .subscribe(
          (data: ProjectModel[]) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get Project By Keyword',
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

  // tslint:disable-next-line:typedef
  getAllProjectSort(orderBy: string, sort: string) {
    return new Observable((observer: Observer<ApiResponseModel>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      const url = `/api/projects-sort?orderBy=${orderBy}&sort=${sort}`;
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
          (data: ApiResponseModel) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.content,
              incidentDate: new Date(),
              function: 'Get All Project Sort',
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

  getAllProjectByCoPMID(id, projectDependency, projectName, page): Observable<ApiResponseModel> {
    return new Observable((observer: Observer<ApiResponseModel>) => {
      const header = {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
      };
      const url = `/api/my-project/${id}?page=${page - 1}&projectDependency=${projectDependency}&projectName=${projectName}`;

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
          (data: ApiResponseModel) => {
            observer.next(data);
          },
          error => {
            observer.error(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Get All Project',
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
