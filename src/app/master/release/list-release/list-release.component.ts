import { Component, OnInit } from '@angular/core';
import {ReleaseService} from '../release.service';
import {Router} from '@angular/router';
import {ReleaseModel, ReleaseModel2} from '../release.model';
import {ProjectModel2} from '../../project/project.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-release',
  templateUrl: './list-release.component.html',
  styleUrls: ['./list-release.component.css']
})
export class ListReleaseComponent implements OnInit {

  fileName = 'List-Release-' + new Date().toDateString() + '.xlsx';
  loadedRelease: ReleaseModel2;
  constructor(private releaseService: ReleaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListRelease();
  }

  onGetListRelease() {
    this.releaseService.getReleaseByProjectId(localStorage.getItem('projectId'))
      .subscribe(data => {
        this.loadedRelease = data;
      }, error => {
        alert(error);
      });
  }

  onAddRelease(){
    this.router.navigate(['/dashboard/release/form-release']);
  }

  updateRelease(release: ReleaseModel){
    this.router.navigateByUrl('/dashboard/release/form-release/' + release.id, {state: release});
  }

  onGoTask(releaseId){
    localStorage.setItem('releaseId', releaseId);
    this.router.navigate(['/dashboard/task']);
  }

  onChangeStatusProject(id){
    this.releaseService.changeStatusRelease(id)
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
}
