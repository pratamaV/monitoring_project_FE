import { Component, OnInit } from '@angular/core';
import {IssuedService} from "../issued.service";
import {Router} from "@angular/router";
import {IssuedModel, IssuedModel2} from "../issued.model";
import {ProjectModel2} from "../../project/project.model";

@Component({
  selector: 'app-list-issued',
  templateUrl: './list-issued.component.html',
  styleUrls: ['./list-issued.component.css']
})
export class ListIssuedComponent implements OnInit {

  loadedIssued: IssuedModel2[] = [];
  constructor(private issuedService: IssuedService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListIssued();
  }

  onGetListIssued() {
    this.issuedService.getAllIssued()
      .subscribe(data => {
        this.loadedIssued = data;
      }, error => {
        alert(error);
      });
  }

  onAddIssued(){
    this.router.navigate(['dashboard/issued/form-issued']);
  }

  updateIssued(issued: IssuedModel){
    this.router.navigateByUrl('/dashboard/issued/form-issued/' + issued.id, {state: issued});
  }

}
