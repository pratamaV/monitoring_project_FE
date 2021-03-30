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

  constructor(
    private projectService: ProjectServiceService,
    private router: Router
  ) {}
  loadedProject: ProjectModel[] = [];
  loadedProjectResult: ProjectModel[] = [];
  filterForm: FormGroup;
  loadedRelease: any;
  filter: boolean = false;
  paramNull = {
    status: null,
    stage: null
  };
  fileName = 'List-Project-' + new Date().toDateString() + '.xlsx';
  divitions: any[] = [];
  users: any[] = [];
  newData: any[] = [];
  projectStatus: string;

  searchByKeyword: string;


  ngOnInit(): void {
    this.buildForm();
    this.onGetListProject();
    this.getAllDivisi();
    this.getAllUser();
    this.getColor();
  }

  getAllDivisi() {
    this.projectService.getAllDivisi().subscribe(
      response => {
        this.divitions = response;
      },
      error => {
        alert(error);
      }
    );
  }

  getAllUser() {
    this.projectService.getAllUser().subscribe(
      response => {
        this.users = response;
      },
      error => {
        alert(error);
      }
    );
  }

  onGetListReleaseFilter(param) {
    this.filter = true;
    if (param.direktorate === null) {
      param.direktorate = '';
    }
    if (param.divisi === null) {
      param.divisi = '';
    }
    if (param.userPM === null) {
      param.userPM = '';
    }
    if (param.userPMO === null) {
      param.userPMO = '';
    }

    this.projectService.getResultProject(param).subscribe(
      data => {
        console.log('datanya adalah:', data);
        this.newData = data;
        console.log('newData adalah:', this.newData);
        this.loadedProjectResult = data;
      },
      error => {
        alert(error);
      }
    );
  }
  onGetListRelease() {
    this.filterForm.get('direktorate').setValue(null);
    this.filterForm.get('divisi').setValue(null);
    this.filterForm.get('userPMO').setValue(null);
    this.filterForm.get('userPM').setValue(null);

    console.log("rest");
    this.filter = false;
  }

  private buildForm(): void {
    this.filterForm = new FormGroup({
      direktorate: new FormControl(null),
      divisi: new FormControl(null),
      userPM: new FormControl(null),
      userPMO: new FormControl(null)
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

  onChangeStatusProject(id, projectStatus) {
    this.projectStatus = projectStatus.target.value;
    this.projectService.changeStatusProject(id, this.projectStatus)
      .subscribe(
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

  searchLive() {
    if (this.searchByKeyword === ''){
      this.projectService.getAllProject().subscribe(
        data => {
          this.loadedProject = data;
        },
        error => {
          alert(error);
        }
      );
    } else {
      this.projectService.getProjectByKeyword(this.searchByKeyword).subscribe(
        data => {
          this.loadedProject = data;
        },
        error => {
          alert(error);
        }
      );
    }
  }

  getColor(){
    for (const iterator of this.loadedProject) {
      console.log(iterator.statusProject);
      
      if(iterator.statusProject === 'aktif'){
        return 'red';
      }
    }
  }
}
