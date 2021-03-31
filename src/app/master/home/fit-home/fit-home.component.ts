import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../user/user.model';
import {TaskModel2} from '../../task/task.model';
import {HomeService} from '../home.service';
import {ProjectServiceService} from '../../project/project-service.service';
import {TaskService} from '../../task/task.service';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-fit-home',
  templateUrl: './fit-home.component.html',
  styleUrls: ['./fit-home.component.css']
})
export class FitHomeComponent implements OnInit {

  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('verticalCanvas') verticalCanvas: ElementRef;
  @ViewChild('horizontalCanvas') horizontalCanvas: ElementRef;

  private pieChart: Chart;
  private verticalChart: Chart;
  private horizontalChart: Chart;

  user: UserModel[] = [];
  taskDeadline: TaskModel2[] = [];
  paramNull = {
    divisi: '',
    userPM: '',
    userPMO: '',
    direktorate: '',
    status: ''
  };
  notStarted = 0;
  onSchedule = 0;
  ptr = 0;
  delay = 0;

  constructor(private homeService: HomeService,
              private projectService: ProjectServiceService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.onGetAllRelases();
    this.onGetListProject();
    this.onGetUserByPerformance();
    this.onGetTaskDeadline();

    const productCanvas = document.getElementById('projectByStatus');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 14;

    let updateDataProject;
    const colorPieChart = ['#f9e0ae',
      '#fc8621',
      '#682c0e',
      '#b3a30c'];
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

    console.log(this.notStarted.toString());


    const pieChart = new Chart('projectByStatus', {
      type: 'pie',
      data: projectData
    });

    // tslint:disable-next-line:typedef
    function updatePieChart(chart, data, color) {
      chart.data.datasets.pop();
      chart.data.datasets.push({
        data,
        backgroundColor: color
      });
      chart.update();
    }


    let updateDataRelease;
    const colorBarChart = ['#f9e0ae',
      '#fc8621',
      '#682c0e',
      '#b3a30c',
      '#c6c36e',
      '#26b186',
      '#428ec1',
      '#680e4f',
      '#4d0651',
      '#8c0b6c'];

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


    // tslint:disable-next-line:typedef
    function updateBarChart(chart, data, color) {
      chart.data.datasets.pop();
      chart.data.datasets.push({
        data,
        backgroundColor: color
      });
      chart.update();
    }

    let updateDataProject2;
    const colorHorBarChart = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#c45850'];

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

    // tslint:disable-next-line:typedef
    function updateHorBarChart(chart, data, color) {
      chart.data.datasets.pop();
      chart.data.datasets.push({
        data,
        backgroundColor: color
      });
      chart.update();
    }

    setInterval(() => {
      this.onGetAllRelases();
      this.onGetListProject();
      this.onGetUserByPerformance();
      this.onGetTaskDeadline();
      updateDataProject = [localStorage.getItem('notStartedProject'),
        localStorage.getItem('onScheduleProject'),
        localStorage.getItem('ptrProject'),
        localStorage.getItem('delayProject')];
      updatePieChart(pieChart, updateDataProject, colorPieChart);

      updateDataRelease = [localStorage.getItem('deliveryStage'),
        localStorage.getItem('development'),
        localStorage.getItem('implementation'),
        localStorage.getItem('live'),
        localStorage.getItem('migration'),
        localStorage.getItem('notStarted'),
        localStorage.getItem('procurement'),
        localStorage.getItem('PTR'),
        localStorage.getItem('requirementGathering'),
        localStorage.getItem('uat')];
      updateBarChart(myChart, updateDataRelease, colorBarChart);

      updateDataProject2 = [localStorage.getItem('KepatuhanandSDM'), localStorage.getItem('Keuangan'),
        localStorage.getItem('OperationalRetail'), localStorage.getItem('Teknik'),
        localStorage.getItem('Utama'), localStorage.getItem('allDirectorate')];
      updateHorBarChart(horizontalBar, updateDataProject2, colorHorBarChart);
    }, 5000);
  }


  // tslint:disable-next-line:typedef
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
      }, error => {
        alert(error);
      });
  }


  // tslint:disable-next-line:typedef
  onGetListProject() {
    this.projectService.getAllProject(this.paramNull)
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

  // tslint:disable-next-line:typedef
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
        alert(error);
      });
  }

}
