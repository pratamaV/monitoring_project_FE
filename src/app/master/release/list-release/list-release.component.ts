import {Component, OnInit} from '@angular/core';
import {ReleaseService} from '../release.service';
import {Router} from '@angular/router';
import {ReleaseModel, ReleaseModel2} from '../release.model';
import {ProjectModel2} from '../../project/project.model';
import * as XLSX from 'xlsx';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-list-release',
  templateUrl: './list-release.component.html',
  styleUrls: ['./list-release.component.css']
})
export class ListReleaseComponent implements OnInit {

  fileName = 'List-Release-' + new Date().toDateString() + '.xlsx';
  filterForm: FormGroup;
  loadedRelease: ReleaseModel2[];
  paramNull = {
    status: null,
    stage: null
  };
  isLoading = false;
  asc = true;
  page = 1;
  pageSize = 10;
  totalItems = 0;

  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;

  constructor(private releaseService: ReleaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onGetListRelease();
  }

  // tslint:disable-next-line:typedef
  onGetListRelease() {
    this.isLoading = true;
    this.filterForm.get('status').setValue(null);
    this.filterForm.get('stage').setValue(null);
    this.releaseService.getReleaseByProjectId(localStorage.getItem('projectId'), this.paramNull)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedRelease = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        alert(error);
      });
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetListRelease();
  }

  private buildForm(): void {
    this.filterForm = new FormGroup({
      status: new FormControl(null),
      stage: new FormControl(null),
    });
  }

  form(property): AbstractControl {
    return this.filterForm.get(property);
  }

  // tslint:disable-next-line:typedef
  onGetListReleaseFilter(param) {
    this.isLoading = true;
    this.releaseService.getReleaseByProjectId(localStorage.getItem('projectId'), param)
      .subscribe(data => {
        this.isLoading = false
        this.loadedRelease = data.content;
      }, error => {
        alert(error);
      });
  }

  onAddRelease() {
    this.router.navigate(['/dashboard/release/form-release']);
  }

  updateRelease(release: ReleaseModel) {
    this.router.navigateByUrl('/dashboard/release/form-release/' + release.id, {state: release});
  }

  onGoTask(releaseId) {
    localStorage.setItem('releaseId', releaseId);
    this.router.navigate(['/dashboard/task']);
  }

  onChangeStatusRelease(id, releaseStatus) {
    this.releaseService.changeStatusRelease(id, releaseStatus.target.value)
      .subscribe(data => {
        window.location.reload();
        this.router.navigate(['/dashboard/release']);
      }, error => {
        alert(error);
      });
  }

  onAddIssued(id) {
    localStorage.setItem('idRelease', id);
    this.router.navigate(['dashboard/issued']);
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

  goToListProject() {
    this.router.navigate(['/dashboard/project']);
  }

  onGetReleaseByIdSort(orderBy: string, sort: string) {
    this.loadedRelease = [];
    this.releaseService.getAllRelaseByIdSort(localStorage.getItem('projectId'), orderBy, sort).subscribe(
      data => {
        // if (this.userRoleNew !== '01'){
        //   for (const relase of data) {
        //     if (relase.statusRelease === 'Active'){
        //       this.isLoading = false;
        //       this.loadedRelease.push(relase);
        //       if (sort === 'ASC') {
        //         this.asc = true;
        //       } else if (sort === 'DESC') {
        //         this.asc = false;
        //       }
        //     }
        //   }
        // } else {
          this.loadedRelease = data;
          if (sort === 'ASC') {
            this.asc = true;
          } else if (sort === 'DESC') {
            this.asc = false;
          }
        // }
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
}
