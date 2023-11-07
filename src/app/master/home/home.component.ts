import { Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { HomeService } from './home.service';
import { ProjectServiceService } from '../project/project-service.service';
import { UserModel } from '../user/user.model';
import { TaskService } from '../task/task.service';
import { TaskModel, TaskModel2 } from '../task/task.model';
import ChartDataLabels from 'node_modules/chartjs-plugin-datalabels';
import { LogErrorModel } from '../log-error.model';
import { LogErrorService } from '../log-error.service';
import { TrainingModel } from '../training/training.model';
import { TrainingService } from '../training/training.service';

declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;

  idLog: string;
  logError: LogErrorModel;
  user: UserModel[] = [];
  taskDeadline: TaskModel2[] = [];
  projectDependency = '';
  directorateUser: string;
  pti: TrainingModel[] = [];
  ilti: TrainingModel[] = [];
  opr: TrainingModel[] = [];
  acd: TrainingModel[] = [];
  skper: TrainingModel[] = [];
  tp: TrainingModel[] = [];
  pjd: TrainingModel[] = [];
  kur: TrainingModel[] = [];
  bbi: TrainingModel[] = [];
  bbumn: TrainingModel[] = [];
  bkorpo: TrainingModel[] = [];
  uwks: TrainingModel[] = [];
  uwas: TrainingModel[] = [];
  reas: TrainingModel[] = [];
  aktu: TrainingModel[] = [];
  rpp: TrainingModel[] = [];
  akunt: TrainingModel[] = [];
  kiv: TrainingModel[] = [];
  subro: TrainingModel[] = [];
  sppap: TrainingModel[] = [];
  khk: TrainingModel[] = [];
  sdm: TrainingModel[] = [];
  mr: TrainingModel[] = [];
  mal: TrainingModel[] = [];

  isScheduled(month: number, scheduledMonths: number[]): boolean {
    return scheduledMonths.includes(month);
  }


  constructor(private homeService: HomeService,
    private projectService: ProjectServiceService,
    private taskService: TaskService,
    private logErrorService: LogErrorService,
    private trainingService: TrainingService) {
  }

  // @ts-ignore
  ngOnInit(): void {
    // this.onGetUserByPerformance();
    this.trainingService.getTrainingByType('T').subscribe(
      data => {
        this.isLoading = false;
          for (const iterator of data.data) {
            if(iterator.timeline === null){
              iterator.timeline = '';
            }
            if(iterator.divisionCode === 'PTI'){
              this.pti.push(iterator);
            } else if(iterator.divisionCode === 'ILTI'){
              this.ilti.push(iterator);
            } else if(iterator.divisionCode === 'OPR'){
              this.opr.push(iterator);
            } else if(iterator.divisionCode === 'SKPER'){
              this.skper.push(iterator);
            } else if(iterator.divisionCode === 'TP'){
              this.tp.push(iterator);
            } else if(iterator.divisionCode === 'PJD'){
              this.pjd.push(iterator);
            } else if(iterator.divisionCode === 'KUR'){
              this.kur.push(iterator);
            } else if(iterator.divisionCode === 'BBI'){
              this.bbi.push(iterator);
            } else if(iterator.divisionCode === 'BBUMN'){
              this.bbumn.push(iterator);
            } else if(iterator.divisionCode === 'BKORPO'){
              this.bkorpo.push(iterator);
            } else if(iterator.divisionCode === 'UWKS'){
              this.uwks.push(iterator);
            } else if(iterator.divisionCode === 'UWAS'){
              this.uwas.push(iterator);
            } else if(iterator.divisionCode === 'REAS'){
              this.reas.push(iterator);
            } else if(iterator.divisionCode === 'AKTU'){
              this.aktu.push(iterator);
            } else if(iterator.divisionCode === 'RPP'){
              this.rpp.push(iterator);
            } else if(iterator.divisionCode === 'AKUNT'){
              this.akunt.push(iterator);
            } else if(iterator.divisionCode === 'KIV'){
              this.kiv.push(iterator);
            } else if(iterator.divisionCode === 'SUBRO'){
              this.subro.push(iterator);
            } else if(iterator.divisionCode === 'SPPAP'){
              this.sppap.push(iterator);
            } else if(iterator.divisionCode === 'KHK'){
              this.khk.push(iterator);
            } else if(iterator.divisionCode === 'SDM'){
              this.sdm.push(iterator);
            } else if(iterator.divisionCode === 'MR'){
              this.mr.push(iterator);
            } else if(iterator.divisionCode === 'MAL'){
              this.mal.push(iterator);
            } else if(iterator.divisionCode === 'ACD'){
              this.acd.push(iterator);
            }
          }
        // this.totalItems = data.totalElements;
      },
      error => {
        this.isLoading = false;
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onGetUserByPerformance() {
    this.user = [];
    this.homeService.getAllUserByPerformance()
      .subscribe(data => {
        for (let i = 0; i < 5; i++) {
          this.user.push(data[i]);
        }
      }, error => {
        alert('Gagal Memuat');
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Get User By Performance',
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


  // tslint:disable-next-line:typedef
  onGetTaskDeadline() {
    this.taskDeadline = [];
    this.taskService.getAllTaskDeadline()
      .subscribe(data => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
          this.taskDeadline.push(data[i]);
        }
      }, error => {
        alert('Gagal Memuat');
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Get Task Deadline',
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
}

