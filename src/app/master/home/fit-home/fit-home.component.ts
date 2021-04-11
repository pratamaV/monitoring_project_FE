import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../user/user.model';
import {TaskModel2} from '../../task/task.model';
import {HomeService} from '../home.service';
import {ProjectServiceService} from '../../project/project-service.service';
import {TaskService} from '../../task/task.service';
import {Chart} from 'node_modules/chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import {LogErrorModel} from "../../log-error.model";
import {LogErrorService} from "../../log-error.service";

@Component({
  selector: 'app-fit-home',
  templateUrl: './fit-home.component.html',
  styleUrls: ['./fit-home.component.css']
})
export class FitHomeComponent implements OnInit {

  user: UserModel[] = [];
  taskDeadline: TaskModel2[] = [];
  projectDependency= '';
  // paramNull = {
  //   divisi: '',
  //   userPM: '',
  //   userPMO: '',
  //   direktorate: '',
  //   status: ''
  // };

  idLog: string;
  logError: LogErrorModel;


  constructor(private homeService: HomeService,
              private projectService: ProjectServiceService,
              private taskService: TaskService,
              private logErrorService: LogErrorService) {
  }

  ngOnInit(): void {
    this.onGetUserByPerformance();
    this.onGetTaskDeadline();
    Chart.defaults.global.defaultFontFamily = 'Helvetica';
    Chart.defaults.global.defaultFontSize = 12;
    Chart.plugins.register(ChartDataLabels);

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
          if (release.statusRelease === 'Active') {
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
        }

        let updateDataRelease;
        const colorBarChart = ['#f9e0ae',
          '#43c6f3',
          '#ea710f',
          '#ea710f',
          '#ea710f',
          '#ea710f',
          '#ea710f',
          '#ea710f',
          '#0ca506',
          '#0ca506',
          '#0ca506'];

        const ctx = document.getElementById('barChart');
        const myChart = new Chart('barChart', {
          type: 'bar',
          data: {
            labels: ['Not Started',
              'Requirement Gathering',
              'Procurement',
              'Development',
              'Delivery Barang',
              'UAT',
              'Migration',
              'PTR',
              'Implementation',
              'Live'
            ],
            datasets: [{
              label: '',
              data: [notStarted, requirementGathering, procurement, development, deliveryStage, uat, migration, PTR, implementation, live],
              backgroundColor: [
                '#43c6f3',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#0ca506',
                '#0ca506',
                '#0ca506'
              ],
              borderColor: [
                '#43c6f3',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#ea710f',
                '#0ca506',
                '#0ca506',
                '#0ca506'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {display: false},
            plugins: {
              datalabels: {
                color: 'white',
                anchor: 'end',
                align: 'bottom',
                formatter: Math.round,
                font: {
                  color: 'blue',
                  weight: 'bold'
                }
              }
            },
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
        function updateBarChart(chart, dataRelease, color) {
          chart.data.datasets.pop();
          chart.data.datasets.push({
            data: dataRelease,
            backgroundColor: color
          });
          chart.update();
        }

        setInterval(() => {
          updateDataRelease = [notStarted, requirementGathering, procurement, development,
            deliveryStage, uat, migration, PTR, implementation, live];
          updateBarChart(myChart, updateDataRelease, colorBarChart);
        }, 1800000);
      }, error => {
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Set Interval',
          isActive: true
        };
        this.logErrorService.saveLogError(this.logError, this.idLog)
          .subscribe(response => {
            // tslint:disable-next-line:no-shadowed-variable
          }, error => {
            alert('Gagal merekam kesalahan');
          });
      });


    this.projectService.getAllProject(this.projectDependency)
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
        let contractedValueBebanUsaha = 0;
        let contractedValueBelanjaModal = 0;
        let budgetBebanUsaha = 0;
        let budgetBelanjaModal = 0;
        for (const project of data.content) {
          if (project.statusProject === 'Active') {
            // if (project.directorateUser === 'Kepatuhan & SDM') {
            //   KepatuhanandSDM = KepatuhanandSDM + 1;
            // } else if (project.directorateUser === 'Keuangan') {
            //   Keuangan = Keuangan + 1;
            // } else if (project.directorateUser === 'Operational Retail') {
            //   OperationalRetail = OperationalRetail + 1;
            // } else if (project.directorateUser === 'Teknik') {
            //   Teknik = Teknik + 1;
            // } else if (project.directorateUser === 'Utama') {
            //   Utama = Utama + 1;
            // } else {
            //   allDirectorate = allDirectorate + 1;
            // }

            if (project.status === 'Not Started') {
              notStarted = notStarted + 1;
            } else if (project.status === 'On Schedule') {
              onSchedule = onSchedule + 1;
            } else if (project.status === 'PTR/ Live') {
              ptr = ptr + 1;
            } else if (project.status === 'Delay') {
              delay = delay + 1;
            }
            //
            // if (project.lineItem === 'Belanja Modal/ Software' || project.lineItem === 'Belanja Modal/ Hardware') {
            //   budgetBelanjaModal = budgetBelanjaModal + project.budget;
            //   contractedValueBelanjaModal = contractedValueBelanjaModal + project.contracted_value;
            // } else if (project.lineItem === 'Beban Usaha') {
            //   budgetBebanUsaha = budgetBebanUsaha + project.budget;
            //   contractedValueBebanUsaha = contractedValueBebanUsaha + project.contracted_value;
            // }
          }
        }

        const projectCanvas = document.getElementById('projectByStatus');
        let updateDataProject;
        const colorPieChart = ['#43c6f3',
          '#ea710f',
          '#0ca506',
          '#de0808'];
        const projectData = {
          labels: [
            'Not Started',
            'On Schedule',
            'PTR/ Live',
            'Delay'
          ],
          datasets: [
            {
              data: [notStarted, onSchedule, ptr, delay],
              backgroundColor: colorPieChart
            }]
        };


        const pieChart = new Chart('projectByStatus', {
          type: 'pie',
          data: projectData,
          options: {
            plugins: {
              datalabels: {
                color: 'white',
                anchor: 'center',
                align: 'center',
                formatter: Math.round,
                font: {
                  color: 'blue',
                  weight: 'bold'
                }
              }
            }
          }
        });

        // tslint:disable-next-line:typedef
        function updatePieChart(chart, dataProject, color) {
          chart.data.datasets.pop();
          chart.data.datasets.push({
            data: dataProject,
            backgroundColor: color
          });
          chart.update();
        }

        const projectByBebanUsahaCanvas = document.getElementById('projectByBebanUsaha');
        let updateDataProject3;
        const colorPieChart2 = ['#ffc1b6', '#fdffbc'];
        const projectData2 = {
          labels: ['Budget', 'Contracted Value'],
          datasets: [
            {
              data: [budgetBebanUsaha, contractedValueBebanUsaha],
              backgroundColor: colorPieChart2
            }]
        };

        const pieChart2 = new Chart('projectByBebanUsaha', {
          type: 'pie',
          data: projectData2,
          options: {
            plugins: {
              datalabels: {
                color: 'black',
                anchor: 'center',
                align: 'center',
                // tslint:disable-next-line:only-arrow-functions
                formatter: function (value) {
                  // tslint:disable-next-line:prefer-const
                  var number_string = value.toString(),
                    sisa = number_string.length % 3,
                    rupiah = number_string.substr(0, sisa),
                    ribuan = number_string.substr(sisa).match(/\d{3}/g);
                  if (ribuan) {
                    const separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                  }
                  return 'Rp ' + rupiah;
                },
                font: {
                  color: 'blue',
                  weight: 'bold'
                }
              }
            }
          }
        });

        // tslint:disable-next-line:typedef
        function updatePieChart2(chart, dataProject, color) {
          chart.data.datasets.pop();
          chart.data.datasets.push({
            data: dataProject,
            backgroundColor: color
          });
          chart.update();
        }

        const projectByBelanjaModalCanvas = document.getElementById('projectByBelanjaModal');
        let updateDataProject4;
        const colorPieChart3 = ['#d3e0ea', '#f6f5f5'];
        const projectData3 = {
          labels: ['Budget', 'Contracted Value'],
          datasets: [
            {
              data: [budgetBelanjaModal, contractedValueBelanjaModal],
              backgroundColor: colorPieChart3
            }]
        };

        const pieChart3 = new Chart('projectByBelanjaModal', {
          type: 'pie',
          data: projectData3,
          options: {
            plugins: {
              datalabels: {
                color: 'black',
                anchor: 'center',
                align: 'center',
                formatter: function (value) {
                  // tslint:disable-next-line:prefer-const
                  var number_string = value.toString(),
                    sisa = number_string.length % 3,
                    rupiah = number_string.substr(0, sisa),
                    ribuan = number_string.substr(sisa).match(/\d{3}/g);
                  if (ribuan) {
                    const separator = sisa ? '.' : '';
                    rupiah += separator + ribuan.join('.');
                  }
                  return 'Rp ' + rupiah;
                },
                font: {
                  color: 'blue',
                  weight: 'bold'
                }
              }
            }
          }
        });

        // tslint:disable-next-line:typedef
        function updatePieChart3(chart, dataProject, color) {
          chart.data.datasets.pop();
          chart.data.datasets.push({
            data: dataProject,
            backgroundColor: color
          });
          chart.update();
        }

        let updateDataProject2;
        const colorHorBarChart = ['#3e95cd', '#8e5ea2', '#3cba9f', '#e8c3b9', '#c45850', '#c45850'];

        const horizontalBar = new Chart(document.getElementById('bar-chart-horizontal'), {
          type: 'horizontalBar',
          data: {
            labels: ['Kepatuhan & SDM', 'Keuangan', 'Operasional', 'Teknik', 'Utama', 'Semua Direktorat'],
            datasets: [
              {
                label: '',
                backgroundColor: colorHorBarChart,
                data: [KepatuhanandSDM, Keuangan, OperationalRetail, Teknik, Utama, allDirectorate]
              }
            ]
          },
          options: {
            legend: {display: false},
            plugins: {
              datalabels: {
                color: 'white',
                anchor: 'center',
                align: 'center',
                formatter: Math.round,
                font: {
                  weight: 'bold'
                }
              }
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
        function updateHorBarChart(chart, dataProject2, color) {
          chart.data.datasets.pop();
          chart.data.datasets.push({
            data: dataProject2,
            backgroundColor: color
          });
          chart.update();
        }


        setInterval(() => {
          updateDataProject = [notStarted, onSchedule, ptr, delay];
          updatePieChart(pieChart, updateDataProject, colorPieChart);

          updateDataProject2 = [KepatuhanandSDM, Keuangan, OperationalRetail, Teknik, Utama, allDirectorate];
          updateHorBarChart(horizontalBar, updateDataProject2, colorHorBarChart);

          updateDataProject3 = [budgetBebanUsaha, contractedValueBebanUsaha];
          updatePieChart2(pieChart2, updateDataProject3, colorPieChart2);

          updateDataProject4 = [budgetBelanjaModal, contractedValueBelanjaModal];
          updatePieChart3(pieChart3, updateDataProject4, colorPieChart3);
        }, 1800000);
      }, error => {
        this.logError = {
          errorMessage: error.message,
          incidentDate: new Date(),
          function: 'Set Interval',
          isActive: true
        };
        this.logErrorService.saveLogError(this.logError, this.idLog)
          .subscribe(response => {
            // tslint:disable-next-line:no-shadowed-variable
          }, error => {
            alert('Gagal merekam kesalahan');
          });
      });


    setInterval(() => {
      this.onGetUserByPerformance();
      this.onGetTaskDeadline();
    }, 1800000);

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
