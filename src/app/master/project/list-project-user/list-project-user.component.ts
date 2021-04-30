import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../project.model';
import {ProjectServiceService} from '../project-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-project-user',
  templateUrl: './list-project-user.component.html',
  styleUrls: ['./list-project-user.component.css']
})
export class ListProjectUserComponent implements OnInit {
  loadedProject: ProjectModel[] = [];
  projectDependency = '';
  isLoading = false;
  orderBy = 'mst_project.project_code';
  sort = 'ASC';
  page = 1;
  pageSize = 10;
  totalItems = 0;
  key: string = 'projectCode';
  reverse: boolean = false;
  userRole = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;

  constructor(private projectService: ProjectServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListProject();
  }

  onGetListProject() {
    this.loadedProject = [];
    this.isLoading = true;
    this.projectService.getAllProject(this.projectDependency, this.projectDependency, this.orderBy, this.sort, this.page)
      .subscribe(data => {
        if (this.userRole !== '01'){
          for (const project of data.content) {
            if (project.statusProject === 'Active'){
              this.isLoading = false;
              this.loadedProject.push(project);
              this.totalItems = data.totalElements;
            }
          }
        } else {
          this.isLoading = false;
          this.loadedProject = data.content;
          this.totalItems = data.totalElements;
        }
      }, error => {
        alert(error);
      });
  }

  sortColumn(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetListProject();
  }

  getDetail(project: ProjectModel, param) {
    localStorage.setItem('backtoproject', param);
    this.router.navigateByUrl('/dashboard/project/detail-project-user/ ' + project.id, {state: project});
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
