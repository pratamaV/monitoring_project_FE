import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { TrainingService } from '../training.service';
import * as XLSX from 'xlsx';
import { ProjectModel } from '../../project/project.model';
import { TrainingModel } from '../training.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-training-non',
  templateUrl: './list-training-non.component.html',
  styleUrls: ['./list-training-non.component.css']
})
export class ListTrainingNonComponent implements OnInit {
  isLoading = false;

  loadedTraining: TrainingModel[] = [];
  requestPayload : any;
  filterForm: FormGroup;
  loadedRelease: any;
  filter = false;
  asc = true;
  fileName = 'List-Project-' + new Date().toDateString() + '.xlsx';
  divitions: any[] = [];
  searchByKeyword: string;
  orderBy = 'mst_project.project_code';
  sort = 'ASC';
  token: any;
  role: any;
  userRole: any;
  key: string = 'projectCode';
  reverse: boolean = false;
  idUsers : any;

  page = 1;
  pageSize = 10;
  totalItems = 0;

  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;

  constructor(
    private trainingService: TrainingService,
    private userServicce: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.onGetListTraining();
  }

  // tslint:disable-next-line:typedef
  sortColumn(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // tslint:disable-next-line:typedef
  onGetListTraining() {
    this.loadedTraining = [];
    this.isLoading = true;
    this.idUsers = JSON.parse(window.sessionStorage.getItem('token')).user.id;    
    this.trainingService.getTrainingByIdUsers(this.idUsers).subscribe(
      data => {
        this.isLoading = false;
          for (const iterator of data.data) {
            if(iterator.type === 'N'){
              this.loadedTraining.push(iterator);
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
  onPageChanges(event) {
    this.page = event;
    // this.onGetListProject();
  }

  // tslint:disable-next-line:typedef
  onAddTraining() {
    this.router.navigate(['/dashboard/training/register/non']);
  }

  // tslint:disable-next-line:typedef
  updateTraining(training: TrainingModel) {
    this.router.navigateByUrl('/dashboard/training/edit/non/' + training.id);
    // this.router.navigateByUrl('/dashboard/training/register/' + training.id, {
    //   state: training
    // });
  }

  // tslint:disable-next-line:typedef
  onGetReleaseByProjectId(projectId) {
    localStorage.setItem('projectId', projectId);
    this.router.navigate(['/dashboard/release']);
  }

  // tslint:disable-next-line:typedef
  submitTraining(training: TrainingModel) {
    this.isLoading = true;
    this.requestPayload = {
      idTraining: training.id,
      trainingName: training.trainingName,
      trainingDate: training.trainingDate,
      trainingParticipants: training.trainingParticipants,
      trainingType: training.trainingType,
      trainingCost : training.trainingCost,
      consumptionCost : training.consumptionCost,
      accommodationCost : training.accommodationCost,
      idUsers: training.idUsers.id,
      divisionCode: training.divisionCode,
      status: '1',
      type: 'N'
    };

    this.trainingService.registerTraining(this.requestPayload)
      .subscribe(
        data => {
          this.isLoading = false;
          if(data.responseCode === '00'){
            Swal.fire('Success', 'Success submit training', 'success');
          } else {
            Swal.fire('Failed', data.responseCode, 'error');
          }
          window.location.reload();
          // this.router.navigate(['/dashboard/project']);
        },
        error => {
          Swal.fire('Success', error, 'error');
          alert(error);
        }
      );
  }

  // tslint:disable-next-line:typedef
  exportexcel() {
    /* table id is passed over here */
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  // tslint:disable-next-line:typedef
  searchLive() {
      // this.projectService.getAllProject(this.searchByKeyword, this.searchByKeyword, this.orderBy, this.sort, this.page).subscribe(
      //   data => {
      //     this.loadedProject = data.content;
      //   },
      //   error => {
      //     alert(error);
      //   }
      // );
  }

  getStyle(project): any {
    if (project.statusProject === 'Not Active') {
      return {
        'background-color': '#bbbfca',
        color: 'black'
      };
    } else if (project.statusProject === 'Completed') {
      return {
        'background-color': '#e8e8e8',
        color: 'black'
      };
    } else if (project.statusProject === 'Active' && project.status === 'Delay') {
      return {
        'background-color': '#ffaaa7',
        color: 'black'
      };
    }
  }

  // tslint:disable-next-line:typedef
  getUserRole() {
    this.token = window.sessionStorage.getItem('token');
    this.role = JSON.parse(this.token);
    this.userRole = this.role.user.userRole;
  }

}
