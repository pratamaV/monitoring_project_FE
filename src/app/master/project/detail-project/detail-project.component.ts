import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../project-service.service";
import {ProjectModel} from "../project.model";

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {

  project: ProjectModel;
  constructor(private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.onGetProjectById();
  }

  onGetProjectById() {
    this.projectService.getProjectById(localStorage.getItem('projectId'))
      .subscribe(data => {
        console.log(data)
        this.project = data;
      }, error => {
        alert(error);
      });
  }
}
