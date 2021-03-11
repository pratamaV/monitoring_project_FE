import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../project.model';
import {TaskModel2} from './../../task/task.model';
import {ReleaseModel} from './../../release/release.model';

@Component({
  selector: 'app-detail-project-user',
  templateUrl: './detail-project-user.component.html',
  styleUrls: ['./detail-project-user.component.css']
})
export class DetailProjectUserComponent implements OnInit {

  projectModel: ProjectModel;
  taskModel: TaskModel2[];
  releaseModel: ReleaseModel[];
  constructor() { }

  ngOnInit(): void {
    this.projectModel = history.state;
    console.log(this.projectModel);
    this.getDetailProject();
  }

  getDetailProject(){
    this.releaseModel = this.projectModel.releaseList;
  }

}
