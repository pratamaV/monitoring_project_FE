import {Component, OnInit} from '@angular/core';
import {IssuedService} from '../issued.service';
import {Router} from '@angular/router';
import {IssuedModel, IssuedModel2} from '../issued.model';
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-issued',
  templateUrl: './list-issued.component.html',
  styleUrls: ['./list-issued.component.css']
})
export class ListIssuedComponent implements OnInit {
  fileName = 'List-Issued-' + new Date().toDateString() + '.xlsx';
  loadedIssued: IssuedModel2[] = [];
  constructor(private issuedService: IssuedService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListIssued();
  }

  onGetListIssued() {
    this.issuedService.getIssuedByReleaseId(localStorage.getItem('idRelease'))
      .subscribe(data => {
        this.loadedIssued = data;
      }, error => {
        Swal.fire( 'Failed', 'maybe you are not logged in' , 'question'  );
      });
  }

  onAddIssued(){
    this.router.navigate(['dashboard/issued/form-issued']);
  }

  updateIssued(issued: IssuedModel){
    this.router.navigateByUrl('/dashboard/issued/form-issued/' + issued.id, {state: issued});
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
