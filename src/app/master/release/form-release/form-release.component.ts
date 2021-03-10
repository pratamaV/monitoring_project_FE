import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReleaseService} from '../release.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ReleaseModel} from '../release.model';

@Component({
  selector: 'app-form-release',
  templateUrl: './form-release.component.html',
  styleUrls: ['./form-release.component.css']
})
export class FormReleaseComponent implements OnInit {

  releaseForm: FormGroup;
  release: ReleaseModel;
  id: string;

  constructor(private route: ActivatedRoute,
              private releaseService: ReleaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.releaseService.getReleaseById(id)
          .subscribe((response) => {
              this.id = id;
              this.setDataToForm(response);
            }, error => {
              alert(error.message);
            }
          );
      }
    });
  }

  private buildForm(): void {
    this.releaseForm  = new FormGroup({
      id: new FormControl(null),
      releaseCode: new FormControl(null),
      releaseName: new FormControl(null),
      score: new FormControl(null),
      weight: new FormControl(null),
      description: new FormControl(null),
      status: new FormControl(null),
      stage: new FormControl(null),
      prosentaseRelease: new FormControl(0),
      estStartdate: new FormControl(null),
      estEnddate: new FormControl(null),
      actStartdate: new FormControl(null),
      actEnddate: new FormControl(null),
      statusRelease: new FormControl('aktif'),
      project: new FormControl(localStorage.getItem('projectId'))
    });
  }

  onSaveRelease(postData, valid: boolean){
    console.log(postData);
    this.release = {
      id: postData.id,
      releaseCode: postData.releaseCode,
      releaseName: postData.releaseName,
      score: postData.score,
      weight: postData.weight,
      description: postData.description,
      status: postData.status,
      stage: postData.stage,
      prosentaseRelease: postData.prosentaseRelease,
      estStartdate: postData.estStartdate,
      estEnddate: postData.estEnddate,
      actStartdate: postData.actStartdate,
      actEnddate: postData.actEnddate,
      statusRelease: postData.statusRelease,
      project: {
        id: postData.project
      }
    };

    if (valid) {
      this.releaseService.saveRelease(this.release, this.id)
        .subscribe(response => {
          this.router.navigate(['/dashboard/release']);
        }, error => {
          alert(error.message);
        });
    }
  }

  private setDataToForm(releaseForm): void {
    this.release = releaseForm;
    if (this.release) {
      this.releaseForm.get('id').setValue(this.release.id);
      this.releaseForm.get('releaseCode').setValue(this.release.releaseCode);
      this.releaseForm.get('releaseName').setValue(this.release.releaseName);
      this.releaseForm.get('score').setValue(this.release.score);
      this.releaseForm.get('weight').setValue(this.release.weight);
      this.releaseForm.get('description').setValue(this.release.description);
      this.releaseForm.get('status').setValue(this.release.status);
      this.releaseForm.get('stage').setValue(this.release.stage);
      this.releaseForm.get('prosentaseRelease').setValue(this.release.prosentaseRelease);
      this.releaseForm.get('estStartdate').setValue(this.release.estStartdate);
      this.releaseForm.get('estEnddate').setValue(this.release.estEnddate);
      this.releaseForm.get('actStartdate').setValue(this.release.actStartdate);
      this.releaseForm.get('actEnddate').setValue(this.release.actEnddate);
      this.releaseForm.get('statusRelease').setValue(this.release.statusRelease);
      this.releaseForm.get('project').setValue(this.release.project.id);
    }
  }

  form(property): AbstractControl {
    return this.releaseForm.get(property);
  }

}
