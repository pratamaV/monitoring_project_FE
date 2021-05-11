import { Component, OnInit } from '@angular/core';
import {ProjectModel, ProjectModel2} from "../project.model";
import {FormGroup} from "@angular/forms";
import {ProjectServiceService} from "../project-service.service";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrls: ['./my-project.component.css']
})
export class MyProjectComponent implements OnInit {

  isLoading = false;
  userLogin = JSON.parse(window.sessionStorage.getItem('token')).user;

  loadedProject: ProjectModel[] = [];
  loadedProjectResult: ProjectModel[] = [];
  filterForm: FormGroup;
  loadedRelease: any;
  filter = false;
  asc = true;
  fileName = 'My-Project-' + new Date().toDateString() + '.xlsx';
  divisions: any[] = [];
  users: any[] = [];
  usersPm: any[] = [];
  usersPmo: any[] = [];
  projectStatus: string;

  searchByKeyword = '';
  projectDependency = '';
  orderBy = 'projectCode';
  sort = 'ASC';
  key: string = 'projectCode';
  reverse: boolean = false;

  token: any;
  role: any;
  userRole: any;

  page = 1;
  pageSize = 10;
  totalItems = 0;

  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;

  constructor(
    private projectService: ProjectServiceService,
    private userServicce: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.buildForm();
    this.onGetListProject();
    this.getAllDivisi();
    this.getAllUser();
  }

  sortColumn(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  // tslint:disable-next-line:typedef
  getAllDivisi() {
    this.projectService.getAllDivisi().subscribe(
      response => {
        this.divisions = response;
      },
      error => {
        alert(error.message);
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
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onGetListProject() {
    this.isLoading = true;
    this.projectService.getAllProjectByCoPMID(this.userLogin.id, this.projectDependency, this.projectDependency, this.page).subscribe(
      data => {
        this.isLoading = false;
        if (this.userRole !== '01') {
          for (const iterator of data.content) {
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
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onPageChanges(event) {
    this.page = event;
    this.onGetListProject();
  }

  // tslint:disable-next-line:typedef
  onGetProjectById(id, param) {
    localStorage.setItem('backtoproject', param);
    localStorage.setItem('projectId', id);
    this.projectService.getProjectById(id).subscribe(
      data => {
        this.router.navigate(['/dashboard/project/detail-project']);
      },
      error => {
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onAddProject() {
    this.router.navigate(['/dashboard/project/form-project']);
  }

  // tslint:disable-next-line:typedef
  onGetProjectBySort(orderBy: string, sort: string) {
    this.loadedProject = [];
    this.projectService.getAllProjectSort(orderBy, sort).subscribe(
      data => {
        if (this.userRoleNew !== '01'){
          for (const project of data.content) {
            if (project.statusProject === 'Active'){
              this.isLoading = false;
              this.loadedProject.push(project);
              if (sort === 'ASC') {
                this.asc = true;
              } else if (sort === 'DESC') {
                this.asc = false;
              }
            }
          }
        } else {
          this.loadedProject = data.content;
          if (sort === 'ASC') {
            this.asc = true;
          } else if (sort === 'DESC') {
            this.asc = false;
          }
        }
      },
      error => {
        alert(error.message);
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
  onGetReleaseByProjectId(project, param) {
    localStorage.setItem('backtoproject', param);
    this.router.navigateByUrl('/dashboard/project/detail-project-user/ ' + project.id, {state: project});
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
          alert(error.message);
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
    this.projectService.getAllProjectByCoPMID(this.userLogin.id, this.searchByKeyword, this.searchByKeyword, this.page).subscribe(
      data => {
        this.loadedProject = data.content;
      },
      error => {
        alert(error.message);
      }
    );
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


}
