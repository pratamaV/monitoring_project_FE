import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../project.model';
import {TaskModel, TaskModel2} from './../../task/task.model';
import {ReleaseModel} from './../../release/release.model';
import {ProjectServiceService} from "../project-service.service";

@Component({
  selector: 'app-detail-project-user',
  templateUrl: './detail-project-user.component.html',
  styleUrls: ['./detail-project-user.component.css']
})
export class DetailProjectUserComponent implements OnInit {

  projectModel: ProjectModel;
  taskModel: TaskModel[] = [];
  releaseModel: ReleaseModel[];
  constructor(private projectService: ProjectServiceService) { }

  ngOnInit(): void {
    this.projectModel = history.state;
    this.getDetailProject();
  }

  getDetailProject(){
    this.releaseModel = this.projectModel.releaseList;
  }


  getTaskByReleaseId(id){
    this.projectService.getTaskByReleaseId(id)
      .subscribe(data => {
        console.log(data);
        this.taskModel = data;
      }, error => {
        alert(error);
      });
  }

}
