import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiResponseTask, ApiResponseTask2, TaskModel, TaskModel2, TaskModel3, TaskModel5} from './task.model';
import {map} from 'rxjs/operators';
import {ReleaseModel2} from "../release/release.model";
import {LogErrorModel} from "../log-error.model";
import {LogErrorService} from "../log-error.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  idLog: string;
  logError: LogErrorModel;

  constructor(private http: HttpClient,
              private logErrorService: LogErrorService) {
  }

  getAllTask(): Observable<TaskModel2[]> {
    return new Observable((observer: Observer<TaskModel2[]>) => {
      this.http.get('/api/tasks?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get All Task',
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

  getAllTaskDeadline(): Observable<TaskModel2[]> {
    return new Observable((observer: Observer<TaskModel2[]>) => {
      this.http.get('/api/taskDeadline?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel2[]) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get All Task Deadline',
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

  addTask(postData: TaskModel3, id: string) {
    return new Observable((observer: Observer<TaskModel3>) => {
      if (id) {
        this.http.put('/api/task?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: TaskModel3) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Edit Task',
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
        this.http.post('/api/addTask?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
          .subscribe((response: TaskModel3) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Save Task',
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


  getTaskById(id): Observable<TaskModel5> {
    return new Observable((observer: Observer<TaskModel5>) => {
      this.http.get(`api/task/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((data: TaskModel5) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get Task By Id',
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

  getTaskByReleaseId(id, param): Observable<ApiResponseTask> {
    let url = ``;
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    if (param.assignTo == null && param.statusDone == null) {
      url = `api/taskByReleaseId/${id}`;
    } else if (param.statusDone == null) {
      url = `api/taskByReleaseId/${id}?assignTo=${param.assignTo}`;
    } else if (param.assignTo == null) {
      url = `api/taskByReleaseId/${id}?statusDone=${param.statusDone}`;
    } else if (!(param.assignTo == null && param.statusDone == null)) {
      url = `api/taskByReleaseId/${id}?assignTo=${param.assignTo}&statusDone=${param.statusDone}`;
    }
    return new Observable((observer: Observer<ApiResponseTask>) => {
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
        .subscribe((data: ApiResponseTask) => {
          observer.next(data);
        }, error => {
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
        });
    });
  }


  createTask(loadData: TaskModel) {
    const formData = new FormData();
    for (const key in loadData) {
      formData.append(key, loadData[key]);
    }
    return new Observable((observer) => {
      this.http.post(`api/task?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData, {responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Save Task',
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

  onDoneTask(loadData, id): Observable<TaskModel2> {
    return new Observable((observer) => {
      this.http.put(`api/doneTask/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, loadData)
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'On Done Task',
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


  getTaskDocument(taskCode): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      // tslint:disable-next-line:max-line-length
      this.http.get(`api/document-task/${taskCode}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, {responseType: 'blob' as 'json'})
        .subscribe((response: any) => {
          console.log(response);
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', taskCode);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          observer.next(response);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Download Document',
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

  // getTaskByUserId(id, param): Observable<TaskModel2[]> {
  //   const estStartDateString = param.estStartDate;
  //   const estEndDateString = param.estEndDate;
  //   // if (param.estStartDate != null) {
  //   //   estStartDateString = this.datepipe.transform(param.estStartDate, 'yyyy-MM-dd');
  //   // }
  //   // if (param.estEndDate != null) {
  //   //   estEndDateString = this.datepipe.transform(param.estEndDate, 'yyyy-MM-dd');
  //   // }
  //   let url = ``;
  //   const header = {
  //     headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
  //   };
  //
  //   // tslint:disable-next-line:max-line-length
  //   if (param.statusDone == null && param.releaseName == null && param.projectName == null && param.estStartDate == null && param.estEndDate == null) {
  //     url = `api/taskByUserId/${id}`;
  //   } else if (param.statusDone != null && param.releaseName != null && param.projectName != null
  //     && param.estStartDate != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}&estEndDate=${estEndDateString}&statusDone=${param.statusDone}`;
  //   } else if (param.releaseName != null && param.projectName != null && param.estStartDate != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}&estEndDate=${estEndDateString}`;
  //   } else if (param.statusDone != null && param.releaseName != null && param.projectName != null
  //     && param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}&statusDone=${param.statusDone}`;
  //   } else if (param.releaseName != null && param.projectName != null && param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDate=${estStartDateString}`;
  //   } else if (param.releaseName != null && param.projectName != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}&estEndDate=${estEndDateString}`;
  //   } else if (param.projectName != null && param.estStartDate != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?projectName=${param.projectName}&estStartDate=${estStartDateString}&estEndDate=${estEndDateString}`;
  //   } else if (param.statusDone != null && param.projectName != null && param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?projectName=${param.projectName}&estStartDate=${estStartDateString}&statusDone=${param.statusDone}`;
  //   } else if (param.statusDone != null && param.estStartDate != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}&estEndDate=${estEndDateString}&statusDone=${param.statusDone}`;
  //   } else if (param.releaseName != null && param.projectName != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&projectName=${param.projectName}`;
  //   } else if (param.releaseName != null && param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&estStartDate=${estStartDateString}`;
  //   } else if (param.releaseName != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&estEndDate=${estEndDateString}`;
  //   } else if (param.statusDone != null && param.releaseName != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}&statusDone=${param.statusDone}`;
  //   } else if (param.projectName != null && param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?projectName=${param.projectName}&estStartDate=${estStartDateString}`;
  //   } else if (param.projectName != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?projectName=${param.projectName}&estEndDate=${estEndDateString}`;
  //   } else if (param.statusDone != null && param.projectName != null) {
  //     url = `api/taskByUserId/${id}?projectName=${param.projectName}&statusDone=${param.statusDone}`;
  //   } else if (param.estStartDate != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}&estEndDate=${estEndDateString}`;
  //   } else if (param.statusDone != null && param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}&statusDone=${param.statusDone}`;
  //   } else if (param.statusDone != null && param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?estEndDate=${estEndDateString}&statusDone=${param.statusDone}`;
  //   } else if (param.releaseName != null) {
  //     url = `api/taskByUserId/${id}?releaseName=${param.releaseName}`;
  //   } else if (param.projectName != null) {
  //     url = `api/taskByUserId/${id}?projectName=${param.projectName}`;
  //   } else if (param.estStartDate != null) {
  //     url = `api/taskByUserId/${id}?estStartDate=${estStartDateString}`;
  //   } else if (param.estEndDate != null) {
  //     url = `api/taskByUserId/${id}?estEndDate=${estEndDateString}`;
  //   } else if (param.statusDone != null) {
  //     url = `api/taskByUserId/${id}?statusDone=${param.statusDone}`;
  //   }
  //   return new Observable((observer: Observer<TaskModel2[]>) => {
  //     this.http.get(url, header)
  //       .subscribe((data: TaskModel2[]) => {
  //         observer.next(data);
  //       }, error => {
  //         observer.error(error.message);
  //       });
  //   });
  // }

  getTaskByUserId(id, param, page): Observable<ApiResponseTask2> {
    if (param.statusDone === null) {
      param.statusDone = '';
    }
    if (param.releaseName === null) {
      param.releaseName = '';
    }
    if (param.projectName === null) {
      param.projectName = '';
    }
    if (param.projectName === null ) {
      param.projectName = '';
    }
    if (param.estStartDateFrom === null || param.estStartDateFrom === undefined) {
      param.estStartDateFrom = '';
    }
    if (param.estStartDateTo === null || param.estStartDateTo === undefined ) {
      param.estStartDateTo = '';
    }
    if (param.estEndDateFrom === null || param.estEndDateFrom === undefined ) {
      param.estEndDateFrom = '';
    }
    if (param.estEndDateTo === null || param.estEndDateTo === undefined) {
      param.estEndDateTo = '';
    }
    let url = ``;
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };

    // tslint:disable-next-line:max-line-length
    url = `api/taskByUserId/${id}?page=${page-1}&statusDone=${param.statusDone}&releaseName=${param.releaseName}&projectName=${param.projectName}&estStartDateFrom=${param.estStartDateFrom}&estStartDateTo=${param.estStartDateTo}&estEndDateFrom=${param.estEndDateFrom}&estEndDateTo=${param.estEndDateTo}`;
    return new Observable((observer: Observer<ApiResponseTask2>) => {
      this.http.get(url, header)
      .pipe(map((responseData: ApiResponseTask2) => {
        const temp = {
          content: responseData.content,
          totalPages: responseData.totalPages,
          totalElements: responseData.totalElements,
          numberOfElements: responseData.numberOfElements
        };
        return temp;
      }))
        .subscribe((data: ApiResponseTask2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get Task By User Id',
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

  getAllTaskByIdReleaseSort(idRelease: string, orderBy: string, sort: string) {
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    const url = `api/taskByReleaseId-sort/${idRelease}?orderBy=${orderBy}&sort=${sort}`;
    return new Observable((observer: Observer<ApiResponseTask>) => {
      this.http.get(url, header)
        .pipe(map((responseData: ApiResponseTask) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements,
            numberOfElements: responseData.numberOfElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponseTask) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get Task By Id Release Sort',
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
  uploadDocumentTask(file, postData, id: string) {
    const formData = new FormData();
    const data = {documentDescription: postData.filedesc}
    formData.append('taskDoc', file);
    // @ts-ignore
    formData.append('data', JSON.stringify(data));
    return new Observable((observer) => {
      this.http.post(`api/uploadTaskDoc/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, formData, {responseType: 'text'})
        .subscribe((response: any) => {
          observer.next(response);
        }, error => {
          observer.error(error);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Upload Document Task',
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


  doneTask(id: string, postData) {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.put(`/api/doneTask/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token, postData)
        .subscribe((response: TaskModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
        });
    });
  }

  updateStatusDoneTask(id: string, param: any) {
    const prosentase = param.prosentase / 100;
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    const formData = new FormData();
    // @ts-ignore
    formData.append('prosentase', prosentase);
    const url = `/api/doneTaskNew/${id}`;
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.put(url, formData, header)
        .subscribe((response: TaskModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Update Status Done Task',
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

  deleteDoc(id) {
    return new Observable((observer: Observer<TaskModel2>) => {
      this.http.delete(`/api/task-file/${id}?access_token=` + JSON.parse(window.sessionStorage.getItem('token')).access_token)
        .subscribe((response: TaskModel2) => {
          observer.next(response);
        }, (error) => {
          observer.error(error);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Delete Document',
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


  getAllTaskByIdUserSort(idUser: string, orderBy: string, sort: string) {
    const header = {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('token')).access_token)
    };
    const url = `api/taskByUserId-sort/${idUser}?orderBy=${orderBy}&sort=${sort}`;
    return new Observable((observer: Observer<ApiResponseTask2>) => {
      this.http.get(url, header)
        .pipe(map((responseData: ApiResponseTask2) => {
          const temp = {
            content: responseData.content,
            totalPages: responseData.totalPages,
            totalElements: responseData.totalElements,
            numberOfElements: responseData.numberOfElements
          };
          return temp;
        }))
        .subscribe((data: ApiResponseTask2) => {
          observer.next(data);
        }, error => {
          observer.error(error.message);
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Get Task By Id User Sort',
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
