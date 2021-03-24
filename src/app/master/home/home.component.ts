import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';
import {HomeService} from './home.service';
import {ProjectServiceService} from '../project/project-service.service';
import {UserModel} from '../user/user.model';
import {TaskService} from '../task/task.service';
import {TaskModel, TaskModel2} from '../task/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserModel[] = [];
  taskDeadline: TaskModel2[] = [];

  constructor(private homeService: HomeService,
              private projectService: ProjectServiceService,
              private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.onGetAllRelases();
    this.onGetListProject();
    this.onGetUserByPerformance();
    this.onGetTaskDeadline();

    setInterval(() => {
      this.onGetAllRelases();
      this.onGetListProject();
      this.onGetUserByPerformance();
      this.onGetTaskDeadline();
    }, 3600000);
    const productCanvas = document.getElementById('releaseByStage');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;
    const projectData = {
      labels: [
        'Not Started',
        'On Schedule',
        'PTR/ Live',
        'Delay'
      ],
      datasets: [
        {
          data: [localStorage.getItem('notStartedProject'),
            localStorage.getItem('onScheduleProject'),
            localStorage.getItem('ptrProject'),
            localStorage.getItem('delayProject')],
          backgroundColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e',
            '#b3a30c'
          ]
        }]
    };

    const pieChart = new Chart(productCanvas, {
      type: 'pie',
      data: projectData
    });


    const ctx = document.getElementById('barChart');
    const myChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Delivery Barang',
          'Development',
          'Implementation',
          'Live',
          'Migration',
          'Not Started',
          'Procurement',
          'PTR',
          'Requirement Gathering',
          'UAT'],
        datasets: [{
          label: '',
          data: [localStorage.getItem('deliveryStage'),
            localStorage.getItem('development'),
            localStorage.getItem('implementation'),
            localStorage.getItem('live'),
            localStorage.getItem('migration'),
            localStorage.getItem('notStarted'),
            localStorage.getItem('procurement'),
            localStorage.getItem('PTR'),
            localStorage.getItem('requirementGathering'),
            localStorage.getItem('uat')],
          backgroundColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e',
            '#b3a30c',
            '#c6c36e',
            '#26b186',
            '#428ec1',
            '#680e4f',
            '#4d0651',
            '#8c0b6c'
          ],
          borderColor: [
            '#f9e0ae',
            '#fc8621',
            '#682c0e',
            '#b3a30c',
            '#c6c36e',
            '#26b186',
            '#428ec1',
            '#680e4f',
            '#4d0651',
            '#8c0b6c'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 80
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    const horizontalBar = new Chart(document.getElementById('bar-chart-horizontal'), {
      type: 'horizontalBar',
      data: {
        labels: ['Kepatuhan & SDM', 'Keuangan', 'Operational Retail', 'Teknik', 'Utama', 'Semua Direktorat'],
        datasets: [
          {
            label: '',
            backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#c45850'],
            data: [localStorage.getItem('KepatuhanandSDM'), localStorage.getItem('Keuangan'),
              localStorage.getItem('OperationalRetail'), localStorage.getItem('Teknik'),
              localStorage.getItem('Utama'), localStorage.getItem('allDirectorate')]
          }
        ]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: 'Number of projects per directorate'
        },
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }],
          yAxes: [{
            ticks: {
              maxRotation: 90,
              minRotation: 80
            }
          }]
        }
      }
    });
  }

  onGetAllRelases() {
    this.homeService.getAllRelease()
      .subscribe(data => {
        let deliveryStage = 0;
        let development = 0;
        let implementation = 0;
        let live = 0;
        let migration = 0;
        let notStarted = 0;
        let procurement = 0;
        let PTR = 0;
        let requirementGathering = 0;
        let uat = 0;
        // let onSchedule = 0;
        // let ptrLive = 0;
        // let notStart = 0;
        for (const release of data) {
          if (release.stage === 'Delivery Barang') {
            deliveryStage = deliveryStage + 1;
          } else if (release.stage === 'Development') {
            development = development + 1;
          } else if (release.stage === 'Implementation') {
            implementation = implementation + 1;
          } else if (release.stage === 'Live') {
            live = live + 1;
          } else if (release.stage === 'Migration') {
            migration = migration + 1;
          } else if (release.stage === 'Not Started') {
            notStarted = notStarted + 1;
          } else if (release.stage === 'Procurement') {
            procurement = procurement + 1;
          } else if (release.stage === 'PTR') {
            PTR = PTR + 1;
          } else if (release.stage === 'Requirement Gathering') {
            requirementGathering = requirementGathering + 1;
          } else if (release.stage === 'UAT') {
            uat = uat + 1;
          }
          // } else if (release.status === 'On Schedule'){
          //   onSchedule = onSchedule + 1;
          // } else if (release.status === 'PTR/ Live'){
          //   ptrLive = ptrLive + 1;
          // } else if (release.status === 'Not Started'){
          //   notStart = notStart + 1;
          // }
        }
        localStorage.setItem('deliveryStage', deliveryStage.toString());
        localStorage.setItem('development', development.toString());
        localStorage.setItem('implementation', implementation.toString());
        localStorage.setItem('live', live.toString());
        localStorage.setItem('migration', migration.toString());
        localStorage.setItem('notStarted', notStarted.toString());
        localStorage.setItem('procurement', procurement.toString());
        localStorage.setItem('PTR', PTR.toString());
        localStorage.setItem('requirementGathering', requirementGathering.toString());
        localStorage.setItem('uat', uat.toString());
        // localStorage.setItem('onSchedule', onSchedule.toString());
        // localStorage.setItem('ptrLive', ptrLive.toString());
        // localStorage.setItem('notStart', notStart.toString());
      }, error => {
        alert(error);
      });
  }


  onGetListProject() {
    this.projectService.getAllProject()
      .subscribe(data => {
        let KepatuhanandSDM = 0;
        let Keuangan = 0;
        let OperationalRetail = 0;
        let Teknik = 0;
        let Utama = 0;
        let notStarted = 0;
        let onSchedule = 0;
        let ptr = 0;
        let delay = 0;
        let allDirectorate = 0;
        for (const project of data) {
          if (project.statusProject === 'Active') {
            if (project.directorateUser === 'Kepatuhan & SDM') {
              KepatuhanandSDM = KepatuhanandSDM + 1;
            } else if (project.directorateUser === 'Keuangan') {
              Keuangan = Keuangan + 1;
            } else if (project.directorateUser === 'Operational Retail') {
              OperationalRetail = OperationalRetail + 1;
            } else if (project.directorateUser === 'Teknik') {
              Teknik = Teknik + 1;
            } else if (project.directorateUser === 'Utama') {
              Utama = Utama + 1;
            } else {
              allDirectorate = allDirectorate + 1;
            }

            if (project.status === 'Not Started') {
              notStarted = notStarted + 1;
            } else if (project.status === 'On Schedule') {
              onSchedule = onSchedule + 1;
            } else if (project.status === 'PTR/ Live') {
              ptr = ptr + 1;
            } else if (project.status === 'Delay') {
              delay = delay + 1;
            }
          }
        }
        localStorage.setItem('KepatuhanandSDM', KepatuhanandSDM.toString());
        localStorage.setItem('Keuangan', Keuangan.toString());
        localStorage.setItem('OperationalRetail', OperationalRetail.toString());
        localStorage.setItem('Teknik', Teknik.toString());
        localStorage.setItem('Utama', Utama.toString());
        localStorage.setItem('allDirectorate', allDirectorate.toString());
        localStorage.setItem('notStartedProject', notStarted.toString());
        localStorage.setItem('onScheduleProject', onSchedule.toString());
        localStorage.setItem('ptrProject', ptr.toString());
        localStorage.setItem('delayProject', delay.toString());
      }, error => {
        alert(error);
      });
  }

  onGetUserByPerformance() {
    this.user = [];
    this.homeService.getAllUserByPerformance()
      .subscribe(data => {
        for (let i = 0; i < 5; i++) {
          this.user.push(data[i]);
        }
      }, error => {
        alert(error);
      });
  }


  onGetTaskDeadline() {
    this.taskService.getAllTaskDeadline()
      .subscribe(data => {
        this.taskDeadline = data;
      }, error => {
        alert(error);
      });
  }


}
