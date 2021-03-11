import { Component, OnInit } from '@angular/core';
import {ReleaseService} from "../release.service";
import {Router} from "@angular/router";
import {ReleaseModel, ReleaseModel2} from "../release.model";
import {ProjectModel2} from "../../project/project.model";

@Component({
  selector: 'app-list-release',
  templateUrl: './list-release.component.html',
  styleUrls: ['./list-release.component.css']
})
export class ListReleaseComponent implements OnInit {

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
    this.router.navigate(['dashboard/issued/form-issued']);
  }
}
