import {Component, OnInit} from '@angular/core';
import {ProjectModel, ProjectModel2} from '../project.model';
import {ProjectServiceService} from '../project-service.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import {FormControl, FormGroup} from '@angular/forms';
import {UserModel} from '../../user/user.model';
import {UserService} from '../../user/user.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  isLoading = false;

  loadedProject: ProjectModel[] = [];
  loadedProjectResult: ProjectModel[] = [];
  filterForm: FormGroup;
  loadedRelease: any;
  filter = false;
  paramNull = {
    divisi: '',
    userPM: '',
    userPMO: '',
    direktorate: '',
    status: ''
  };
  asc = true;
  fileName = 'List-Project-' + new Date().toDateString() + '.xlsx';
  divitions: any[] = [];
  users: any[] = [];
  usersPm: any[] = [];
  usersPmo: any[] = [];
  projectStatus: string;

  searchByKeyword: string;

  token: any;
  role: any;
  userRole: any;

  page = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private projectService: ProjectServiceService,
    private userServicce: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onGetListProject();
    this.getAllDivisi();
    this.getAllUser();
    this.getUserRole();
  }

  // tslint:disable-next-line:typedef
  getAllDivisi() {
    this.projectService.getAllDivisi().subscribe(
      response => {
        this.divitions = response;
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getAllUser() {
    this.projectService.getAllUser().subscribe(
      response => {
        this.users = response;
        for (const user of this.users) {
          // tslint:disable-next-line:triple-equals
          if (user.userRole == '01') {
            this.usersPmo.push(user);
            // tslint:disable-next-line:triple-equals
          } else if (user.userRole == '02') {
            this.usersPm.push(user);
          }
        }
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onGetListProjectFilter(param) {
    this.isLoading = true;
    // this.filter = true;
    if (param.direktorate === null) {
      param.direktorate = '';
    }
    if (param.divisi === null) {
      param.divisi = '';
    }
    if (param.userPM === null) {
      param.userPM = '';
    }
    if (param.userPMO === null) {
      param.userPMO = '';
    }
    if (param.status === null) {
      param.status = '';
    }

    // this.projectService.getResultProject(param).subscribe(
    this.projectService.getAllProject(param).subscribe(
      data => {
        this.isLoading = false;
        this.loadedProject = data.content;
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onGetListRelease() {
    this.filterForm.get('divisi').setValue(null);
    this.filterForm.get('userPM').setValue(null);
    this.filterForm.get('userPMO').setValue(null);
    this.filterForm.get('direktorate').setValue(null);
    this.filterForm.get('status').setValue(null);
    console.log('rest');
    this.filter = false;
  }

  private buildForm(): void {
    this.filterForm = new FormGroup({
      direktorate: new FormControl(null),
      divisi: new FormControl(null),
      userPM: new FormControl(null),
      userPMO: new FormControl(null),
      status: new FormControl(null)
    });
  }

  // tslint:disable-next-line:typedef
  onGetListProject() {
    this.isLoading = true;
    this.filterForm.get('direktorate').setValue(null);
    this.filterForm.get('divisi').setValue(null);
    this.filterForm.get('userPMO').setValue(null);
    this.filterForm.get('userPM').setValue(null);
    this.filterForm.get('status').setValue(null);
    this.projectService.getAllProject(this.paramNull).subscribe(
      data => {
        this.isLoading = false;
        if (this.userRole != '01') {
          for (const iterator of data.content) {
            console.log(iterator);
            if (iterator.statusProject === 'Active') {
              this.loadedProject.push(iterator);
            }
          }
        } else {
          this.loadedProject = data.content;
        }
        this.totalItems = data.totalElements;
      },
      error => {
        alert(error);
      }
    );
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetListProject();
  }

  // tslint:disable-next-line:typedef
  onGetProjectById(id) {
    localStorage.setItem('projectId', id);
    this.projectService.getProjectById(id).subscribe(
      data => {
        this.router.navigate(['/dashboard/project/detail-project']);
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getColor() {
    for (const iterator of this.loadedProject) {
      console.log(iterator.statusProject);
      if (iterator.statusProject === 'aktif') {
        return 'red';
      }
    }
  }

  // tslint:disable-next-line:typedef
  onAddProject() {
    this.router.navigate(['/dashboard/project/form-project']);
  }

  onGetProjectBySort(orderBy: string, sort: string) {
    this.projectService.getAllProjectSort(orderBy, sort).subscribe(
      data => {
        this.isLoading = false;
        this.loadedProject = data.content;
        if (sort === 'ASC') {
          this.asc = true;
        } else if (sort === 'DESC') {
          this.asc = false;
        }
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  updateProject(project: ProjectModel2) {
    this.router.navigateByUrl('/dashboard/project/form-project/' + project.id, {
      state: project
    });
  }

  // tslint:disable-next-line:typedef
  onGetReleaseByProjectId(projectId) {
    localStorage.setItem('projectId', projectId);
    this.router.navigate(['/dashboard/release']);
  }

  // tslint:disable-next-line:typedef
  onChangeStatusProject(id, projectStatus) {
    this.projectStatus = projectStatus.target.value;
    this.projectService.changeStatusProject(id, this.projectStatus)
      .subscribe(
        data => {
          window.location.reload();
          this.router.navigate(['/dashboard/project']);
        },
        error => {
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
    if (this.searchByKeyword === '') {
      this.projectService.getAllProject(this.paramNull).subscribe(
        data => {
          this.loadedProject = data.content;
        },
        error => {
          alert(error);
        }
      );
    } else {
      this.projectService.getProjectByKeyword(this.searchByKeyword).subscribe(
        data => {
          this.loadedProject = data;
        },
        error => {
          alert(error);
        }
      );
    }
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
        'background-color': '#b67162',
        color: 'white'
      };
    }
  }

  getUserRole() {
    this.token = window.sessionStorage.getItem('token');
    this.role = JSON.parse(this.token);
    this.userRole = this.role.user.userRole;
    console.log(this.userRole);
  }
}
