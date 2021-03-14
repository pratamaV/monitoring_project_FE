import { Component, OnInit } from '@angular/core';
import {ProjectModel, ProjectModel2} from '../project.model';
import {ProjectServiceService} from '../project-service.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  loadedProject: ProjectModel[] = [];
  fileName = 'List-Project-' + new Date().toDateString() + '.xlsx';

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


}
