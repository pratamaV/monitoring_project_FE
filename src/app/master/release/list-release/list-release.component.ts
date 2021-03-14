import { Component, OnInit } from '@angular/core';
import {ReleaseService} from '../release.service';
import {Router} from '@angular/router';
import {ReleaseModel, ReleaseModel2} from '../release.model';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-release',
  templateUrl: './list-release.component.html',
  styleUrls: ['./list-release.component.css']
})
export class ListReleaseComponent implements OnInit {
  filterForm: FormGroup;
  loadedRelease: ReleaseModel2;
  paramNull = {
    status: null,
    stage: null
  };
  constructor(private releaseService: ReleaseService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetListRelease();
  }

  // tslint:disable-next-line:typedef
  onGetListRelease() {
    this.filterForm.get('status').setValue(null);
    this.filterForm.get('stage').setValue(null);
    this.releaseService.getReleaseByProjectId(localStorage.getItem('projectId'), this.paramNull)
      .subscribe(data => {
        this.loadedRelease = data;
      }, error => {
        alert(error);
      });
  }

  private buildForm(): void {
    this.filterForm  = new FormGroup({
      status: new FormControl(null),
      stage: new FormControl(null),
      });
  }

  form(property): AbstractControl {
    return this.filterForm.get(property);
  }

  // tslint:disable-next-line:typedef
  onGetListReleaseFilter(param) {
    console.log('masuk sini');
    console.log(param);
    this.releaseService.getReleaseByProjectId(localStorage.getItem('projectId'), param)
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
}
