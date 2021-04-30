import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ReleaseModel, ReleaseModel2} from '../release.model';
import {ReleaseService} from '../release.service';
import {ProjectServiceService} from '../../project/project-service.service';
import {Router} from '@angular/router';
import * as XLSX from 'xlsx';
import {ProjectModel} from '../../project/project.model';

@Component({
  selector: 'app-release-view',
  templateUrl: './release-view.component.html',
  styleUrls: ['./release-view.component.css']
})
export class ReleaseViewComponent implements OnInit {


  fileName = 'List-Release-' + new Date().toDateString() + '.xlsx';
  filterForm2: FormGroup;
  loadedRelease: ReleaseModel2[];
  paramNull = {
    projectName: '',
    userPM: '',
    userPMO: '',
    userCoPM: '',
    status: '',
    stage: '',
    divisi: '',
    directoratUser: '',
    developmentMode: ''
  };
  isLoading = false;
  asc = true;
  page = 1;
  pageSize = 10;
  totalItems = 0;
  divitions: any[] = [];
  projects: ProjectModel[] = [];
  users: any[] = [];
  usersPm: any[] = [];
  usersPmo: any[] = [];
  usersCoPM: any[] = [];
  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;
  key: string = 'releaseCode';
  reverse: boolean = false;

  resultSearch: string;

  constructor(private releaseService: ReleaseService,
              private projectService: ProjectServiceService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onGetListRelease();
    this.getAllDivisi();
    this.getAllUser();
    this.getProjects();
  }

  sortColumn(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // tslint:disable-next-line:typedef
  onGetListRelease() {
    this.isLoading = true;
    this.filterForm2.get('projectName').setValue(null);
    this.filterForm2.get('userPM').setValue(null);
    this.filterForm2.get('userPMO').setValue(null);
    this.filterForm2.get('userCoPM').setValue(null);
    this.filterForm2.get('status').setValue(null);
    this.filterForm2.get('stage').setValue(null);
    this.filterForm2.get('divisi').setValue(null);
    this.filterForm2.get('directoratUser').setValue(null);
    this.filterForm2.get('developmentMode').setValue(null);
    this.releaseService.getAllReleasePerPage(this.paramNull, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedRelease = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
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

  getProjects() {
    this.projectService.getProjects().subscribe(
      response => {
        this.projects = response;
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  getAllUser() {
    this.projectService.getAllUser().subscribe(
      response => {
        this.users = response;
        for (const user of this.users) {
          // tslint:disable-next-line:triple-equals
          if (user.userRole == '01') {
            this.usersPmo.push(user);
            // tslint:disable-next-line:triple-equals
          } else if (user.userRole == '02') {
            this.usersPm.push(user);
            // tslint:disable-next-line:triple-equals
          }
          // else if (user.userRole == '03') {
            this.usersCoPM.push(user);
          // }
        }
      },
      error => {
        alert(error);
      }
    );
  }

  // tslint:disable-next-line:typedef
  onPageChanges(event) {
    this.page = event;
    this.onGetListReleaseFilter(this.filterForm2.value);
  }

  private buildForm(): void {
    this.filterForm2 = new FormGroup({
      projectName: new FormControl(null),
      userPM: new FormControl(null),
      userPMO: new FormControl(null),
      userCoPM: new FormControl(null),
      status: new FormControl(null),
      stage: new FormControl(null),
      divisi: new FormControl(null),
      directoratUser: new FormControl(null),
      developmentMode: new FormControl(null)
    });
  }

  form(property): AbstractControl {
    return this.filterForm2.get(property);
  }

  // tslint:disable-next-line:typedef
  onGetListReleaseFilter(param) {
    this.isLoading = true;
    this.releaseService.getAllReleasePerPage(param, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedRelease = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  searchLive(){
    if (this.resultSearch === ''){
      this.isLoading = true;
      this.filterForm2.get('projectName').setValue(null);
      this.filterForm2.get('userPM').setValue(null);
      this.filterForm2.get('userPMO').setValue(null);
      this.filterForm2.get('userCoPM').setValue(null);
      this.filterForm2.get('status').setValue(null);
      this.filterForm2.get('stage').setValue(null);
      this.filterForm2.get('divisi').setValue(null);
      this.filterForm2.get('directoratUser').setValue(null);
      this.filterForm2.get('developmentMode').setValue(null);
      this.releaseService.getAllReleasePerPage(this.paramNull, this.page)
        .subscribe(data => {
          this.isLoading = false;
          this.loadedRelease = data.content;
          this.totalItems = data.totalElements;
        }, error => {
          alert(error);
        });
    } else {
      this.releaseService.getAllReleaseSearch(this.resultSearch, this.resultSearch)
        .subscribe(data => {
          this.loadedRelease = data.content;
        }, error => {
          alert(error);
        });
    }
  }

  // tslint:disable-next-line:typedef
  onAddRelease() {
    this.router.navigate(['/dashboard/release/form-release']);
  }

  // tslint:disable-next-line:typedef
  updateRelease(release: ReleaseModel) {
    this.router.navigateByUrl('/dashboard/release/form-release/' + release.id, {state: release});
  }

  // tslint:disable-next-line:typedef
  onGoTask(releaseId, param) {
    localStorage.setItem('releaseId', releaseId);
    localStorage.setItem('navigate1', param);
    this.router.navigate(['/dashboard/task']);
  }

  // tslint:disable-next-line:typedef
  onChangeStatusRelease(id, releaseStatus) {
    this.releaseService.changeStatusRelease(id, releaseStatus.target.value)
      .subscribe(data => {
        window.location.reload();
        this.router.navigate(['/dashboard/release']);
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onAddIssued(id) {
    localStorage.setItem('idRelease', id);
    this.router.navigate(['dashboard/issued']);
  }

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  goToListProject() {
    this.router.navigate(['/dashboard/project']);
  }

  // tslint:disable-next-line:typedef

  onGetReleaseSort(orderBy: string, sort: string) {
    this.loadedRelease = [];
    this.releaseService.getAllReleaseSort(orderBy, sort).subscribe(
      data => {
        this.loadedRelease = data.content;
        if (sort === 'ASC') {
          this.asc = true;
        } else if (sort === 'DESC') {
          this.asc = false;
        }
      },
      error => {
        alert(error);
      }
    );
  }

  getStyle(release): any {
    if (release.statusRelease === 'Not Active') {
      return {
        'background-color': '#bbbfca',
        color : 'black'
      };
    } else if (release.statusRelease === 'Completed') {
      return {
        'background-color': '#e8e8e8',
        color: 'black'
      };
    } else if (release.statusRelease === 'Active' && release.status === 'Delay') {
      return {
        'background-color': '#ffaaa7',
        color: 'black'
      };
    }
  }

  onGetReleaseById(id, param){
    localStorage.setItem('releaseId', id);
    localStorage.setItem('paramviagatetask', param);
    this.router.navigateByUrl([`/dashboard/release/detail-release/`] + id);
  }

}
