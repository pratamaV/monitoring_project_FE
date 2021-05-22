import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReleaseService} from '../release.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReleaseModel} from '../release.model';
import Swal from 'sweetalert2';
import {DivisionModel, ProjectModel, UserModel} from '../../project/project.model';
import {ProjectServiceService} from '../../project/project-service.service';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-form-release',
  templateUrl: './form-release.component.html',
  styleUrls: ['./form-release.component.css']
})
export class FormReleaseComponent implements OnInit {

  releaseForm: FormGroup;
  release: ReleaseModel;
  id: string;
  userPMO: UserModel[] = [];
  userPM: UserModel[] = [];
  userCoPM: UserModel[] = [];
  userDepartmentHead: UserModel[] = [];
  loadedUser: UserModel[] = [];
  loadedDivision: DivisionModel[] = [];
  pmId: '';
  pmoId: '';
  coPMId: '';
  divisionId: '';
  project: ProjectModel;
  ContractedValueString: string;
  split: any;
  join1: any;
  match: any;
  join2: any;
  fixContractedValue: number;
  projectId: string;


  constructor(private route: ActivatedRoute,
              private releaseService: ReleaseService,
              private router: Router,
              private projectService: ProjectServiceService,
              private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.onGetProjectById();
    this.onGetAllDivision();
    this.onGetAllUser();
    this.buildForm();
    this.currencyPipes();
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
      releaseName: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [Validators.required, Validators.pattern('^(?:[1-9]|0[1-9]|10)$')]),
      weight: new FormControl(null),
      description: new FormControl(null, ),
      status: new FormControl(null, [Validators.required]),
      stage: new FormControl(null, [Validators.required]),
      prosentaseRelease: new FormControl(0),
      estStartdate: new FormControl(null),
      estEnddate: new FormControl(null),
      actStartdate: new FormControl(null),
      actEnddate: new FormControl(null),
      statusRelease: new FormControl('Active'),
      pmo: new FormControl(null, [Validators.required]),
      pm: new FormControl(null, [Validators.required]),
      coPM: new FormControl(null, [Validators.required]),
      divisiUser: new FormControl(null, [Validators.required]),
      directorateUser: new FormControl(null, [Validators.required]),
      departmentHead : new FormControl(null),
      categoryActivity: new FormControl(null, [Validators.required]),
      developmentMode: new FormControl(null, [Validators.required]),
      contractedValue: new FormControl(null),
      project: new FormControl(localStorage.getItem('projectId'))
    });
  }

  currencyPipes(){
    this.releaseForm.valueChanges.subscribe( form => {
      if (form.contractedValue){
        this.ContractedValueString = form.contractedValue + '';
        this.releaseForm.patchValue({
          contractedValue : this.currencyPipe.transform(this.ContractedValueString.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
        }, {emitEvent: false});
      }
    });
  }

  onGetProjectById(){
    console.log(localStorage.getItem('projectId'));
    if (localStorage.getItem('projectId')){
      this.projectService.getProjectById(localStorage.getItem('projectId')).subscribe(response => {
        this.project = response;
      }, error => {
        alert(error.message);
      });
    } else {
      this.projectService.getProjectById(history.state.project.id).subscribe(response => {
        this.project = response;
      }, error => {
        alert(error.message);
      });
    }
  }

  // tslint:disable-next-line:typedef
  onSaveRelease(postData, valid: boolean){
    if (postData.contractedValue){
      this.ContractedValueString = postData.contractedValue + '';
      this.split = this.ContractedValueString.split(',');
      this.join1 = this.split.join('');
      this.match = this.join1.match(/\d/g);
      this.join2 = this.match.join('');
      this.fixContractedValue = parseInt(this.join2);
    }
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
      pmo: {
        id: postData.pmo.id
      },
      pm: {
        id: postData.pm.id
      },
      coPM: {
        id: postData.coPM.id
      },
      divisiUser: {
        id: postData.divisiUser.id
      },
      directorateUser: postData.directorateUser,
      categoryActivity: postData.categoryActivity,
      contractedValue: this.fixContractedValue,
      departmentHead: {
        id: postData.departmentHead.id
      },
      developmentMode: postData.developmentMode,
      project: {
        id: postData.project
      }
    };
    console.log(this.release);
    if (valid) {
      this.releaseService.saveRelease(this.release, this.id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Release berhasil disimpan' , 'success'  );
          history.back();
          // this.router.navigate(['/dashboard/release']);
        }, error => {
          Swal.fire( 'Failed', 'Gagal menyimpan release' , 'error'  );
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
      this.releaseForm.get('pmo').setValue(this.release.pmo);
      this.releaseForm.get('pm').setValue(this.release.pm);
      this.releaseForm.get('coPM').setValue(this.release.coPM);
      this.releaseForm.get('divisiUser').setValue(this.release.divisiUser);
      this.releaseForm.get('directorateUser').setValue(this.release.directorateUser);
      this.releaseForm.get('departmentHead').setValue(this.release.departmentHead);
      this.releaseForm.get('categoryActivity').setValue(this.release.categoryActivity);
      this.releaseForm.get('developmentMode').setValue(this.release.developmentMode);
      this.releaseForm.get('contractedValue').setValue(this.release.contractedValue);
      this.releaseForm.get('project').setValue(this.release.project.id);
    }
  }

  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
        // for (const user of data) {
        //   if (user.userRole === '01') {
        //     this.userPMO.push(user);
        //   }
        //   if (user.userRole === '02') {
        //     this.userPM.push(user);
        //   }
        //   if (user.userRole === '03') {
        //     this.userCoPM.push(user);
        //   }
        //   if (user.userRole === '05') {
        //     this.userDepartmentHead.push(user);
        //   }
        // }

      }, error => {
        alert(error);
      });
  }

  onGetAllDivision() {
    this.projectService.getAllDivison()
      .subscribe(data => {
        this.loadedDivision = data;
      }, error => {
        alert(error);
      });
  }

  compareDivision(c1: DivisionModel, c2: DivisionModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareUser(c1: UserModel, c2: UserModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  form(property): AbstractControl {
    return this.releaseForm.get(property);
  }

  onGolistRelease() {
    this.router.navigate(['/dashboard/release']);
  }
}
