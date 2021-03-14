import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../project-service.service";
import {ProjectModel} from "../project.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {

  project: ProjectModel;
  constructor(private projectService: ProjectServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetProjectById();
  }

  onGetProjectById() {
    this.projectService.getProjectById(localStorage.getItem('projectId'))
      .subscribe(data => {
        this.project = data;
      }, error => {
        alert(error);
      });
  }

  onGolistProject() {
    this.router.navigate(['/dashboard/project']);
  }
}
