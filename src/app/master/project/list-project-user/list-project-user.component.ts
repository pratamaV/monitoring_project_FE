import { Component, OnInit } from '@angular/core';
import {ProjectModel} from "../project.model";
import {ProjectServiceService} from "../project-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-project-user',
  templateUrl: './list-project-user.component.html',
  styleUrls: ['./list-project-user.component.css']
})
export class ListProjectUserComponent implements OnInit {
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

  getDetail(project: ProjectModel) {
    this.router.navigateByUrl('/dashboard/project/detail-project-user/ ' + project.id, {state: project});
  }

}
