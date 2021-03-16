import { Component, OnInit } from '@angular/core';
import { ProjectModel, ProjectModel2 } from '../project.model';
import { ProjectServiceService } from '../project-service.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {
  loadedProject: ProjectModel[] = [];
  filterForm: FormGroup;
  loadedRelease: any;
  paramNull = {
    status: null,
    stage: null
  };
  fileName = 'List-Project-' + new Date().toDateString() + '.xlsx';

  constructor(
    private projectService: ProjectServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetListProject();
    this.onGetListRelease();
  }

  onGetListReleaseFilter(param) {
    console.log('masuk sini');
    console.log(param);
    this.projectService
      .getReleaseByProjectId(localStorage.getItem('projectId'), param)
      .subscribe(
        data => {
          this.loadedRelease = data;
        },
        error => {
          alert(error);
        }
      );
  }

  // tslint:disable-next-line:typedef
  onGetListRelease() {
    this.filterForm.get('status').setValue(null);
    this.filterForm.get('stage').setValue(null);
    this.projectService
      .getReleaseByProjectId(localStorage.getItem('projectId'), this.paramNull)
      .subscribe(
        data => {
          this.loadedRelease = data;
        },
        error => {
          alert(error);
        }
      );
  }

  private buildForm(): void {
    this.filterForm = new FormGroup({
      status: new FormControl(null),
      stage: new FormControl(null)
    });
  }

  onGetListProject() {
    this.projectService.getAllProject().subscribe(
      data => {
        this.loadedProject = data;
      },
      error => {
        alert(error);
      }
    );
  }

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

  onAddProject() {
    this.router.navigate(['/dashboard/project/form-project']);
  }

  updateProject(project: ProjectModel2) {
    this.router.navigateByUrl('/dashboard/project/form-project/' + project.id, {
      state: project
    });
  }

  onGetReleaseByProjectId(projectId) {
    localStorage.setItem('projectId', projectId);
    this.router.navigate(['/dashboard/release']);
  }

  onChangeStatusProject(id) {
    this.projectService.changeStatusProject(id).subscribe(
      data => {
        window.location.reload();
        this.router.navigate(['/dashboard/project']);
      },
      error => {
        alert(error);
      }
    );
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
