import { Component, OnInit } from '@angular/core';
import {ProjectModel, ProjectModel2} from '../project.model';
import {ProjectServiceService} from '../project-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  loadedProject: ProjectModel[] = [];

  constructor(private projectService: ProjectServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListProject();
  }

  onGetListProject() {
    this.projectService.getAllProject()
      .subscribe(data => {
        this.loadedProject = data;
      }, error => {
        alert(error);
      });
  }

  onGetProjectById(id) {
    localStorage.setItem('projectId', id);
    this.projectService.getProjectById(id)
      .subscribe(data => {
        this.router.navigate(['/dashboard/project/detail-project']);
      }, error => {
        alert(error);
      });
  }

  onAddProject(){
    this.router.navigate(['/dashboard/project/form-project']);
  }

  updateProject(project: ProjectModel2){
    this.router.navigateByUrl('/dashboard/project/form-project/' + project.id, {state: project});
  }

  onGetReleaseByProjectId(projectId){
    localStorage.setItem('projectId', projectId);
    this.router.navigate(['/dashboard/release']);
  }

  onChangeStatusProject(id){
    this.projectService.changeStatusProject(id)
      .subscribe(data => {
        window.location.reload();
        this.router.navigate(['/dashboard/project']);
      }, error => {
        alert(error);
      });
  }


}
