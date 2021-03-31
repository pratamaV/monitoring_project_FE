import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectServiceService} from '../project-service.service';
import {DivisionModel, ProjectModel, ProjectModel2, UserModel} from '../project.model';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {
  projectForm: FormGroup;
  project: ProjectModel2;
  loadedUser: UserModel[] = [];
  userPMO: UserModel[] = [];
  userPM: UserModel[] = [];
  userCoPM: UserModel[] = [];
  userDepartmentHead: UserModel[] = [];
  loadedDivision: DivisionModel[] = [];
  id: string;
  pmId: '';
  pmoId: '';
  coPMId: '';
  divisionId: '';
  split: any;
  join1: any;
  match : any;
  join2: any;
  fixBudget: number;
  fixContractedValue: number;
  fixPaymentRealization: number;

  constructor(private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute,
              private currencyPipe : CurrencyPipe
              ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.currencyPipes();
    this.onGetAllUser();
    this.onGetAllDivision();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.projectService.getProjectById(id)
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
    this.projectForm = new FormGroup({
      id: new FormControl(null),
      projectCode: new FormControl(null),
      projectName: new FormControl(null, [Validators.required]),
      pmo: new FormControl(null, [Validators.required]),
      pm: new FormControl(null, [Validators.required]),
      benefit: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      coPM: new FormControl(null, [Validators.required]),
      divisiUser: new FormControl(null, [Validators.required]),
      directorateUser: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      targetLive: new FormControl(null, [Validators.required]),
      prosentaseProject: new FormControl(0),
      budget: new FormControl(null),
      contracted_value: new FormControl(null),
      paymentRealization: new FormControl(null),
      keyword : new FormControl(null),
      departmentHead : new FormControl(null),
      score: new FormControl(null, [Validators.required, Validators.pattern('^(?:[1-9]|0[1-9]|10)$')]),
      weight: new FormControl(null),
      categoryActivity: new FormControl(null, [Validators.required]),
      categoryInitiative: new FormControl(null, [Validators.required]),
      statusProject: new FormControl('Active')
    });
  }

  currencyPipes(){
    this.projectForm.valueChanges.subscribe( form => {
      if(form.budget){
        this.projectForm.patchValue({
          budget : this.currencyPipe.transform(form.budget.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
      if(form.contracted_value){
        this.projectForm.patchValue({
          contracted_value : this.currencyPipe.transform(form.contracted_value.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
      if(form.paymentRealization){
        this.projectForm.patchValue({
          paymentRealization : this.currencyPipe.transform(form.paymentRealization.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
    })
  }

  compareDivision(c1: DivisionModel, c2: DivisionModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareUser(c1: UserModel, c2: UserModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSaveProject(postData, valid: boolean) {

    if(postData.budget){
      this.split = postData.budget.split(',')
      this.join1 = this.split.join('')
      this.match = this.join1.match(/\d/g)
      this.join2 = this.match.join('')
      this.fixBudget = parseInt(this.join2)
    }
    if(postData.contracted_value){
      this.split = postData.contracted_value.split(',')
      this.join1 = this.split.join('')
      this.match = this.join1.match(/\d/g)
      this.join2 = this.match.join('')
      this.fixContractedValue = parseInt(this.join2)
    }
    if(postData.paymentRealization){
      this.split = postData.paymentRealization.split(',')
      this.join1 = this.split.join('')
      this.match = this.join1.match(/\d/g)
      this.join2 = this.match.join('')
      this.fixPaymentRealization = parseInt(this.join2)
    }

    this.project = {
      id: postData.id,
      projectCode: postData.projectCode,
      projectName: postData.projectName,
      pmo: {
        id: postData.pmo.id
      },
      pm: {
        id: postData.pm.id
      },
      benefit: postData.benefit,
      description: postData.description,
      coPM: {
        id: postData.coPM.id
      },
      divisiUser: {
        id: postData.divisiUser.id
      },
      directorateUser: postData.directorateUser,
      status: postData.status,
      targetLive: postData.targetLive,
      prosentaseProject: postData.prosentaseProject,
      budget: this.fixBudget,
      contracted_value: this.fixContractedValue,
      paymentRealization: this.fixPaymentRealization,
      score: postData.score,
      weight: postData.weight,
      categoryActivity: postData.categoryActivity,
      categoryInitiative: postData.categoryInitiative,
      statusProject: postData.statusProject,
      keyword: postData.keyword,
      departmentHead: {
        id: postData.departmentHead.id
      }
    };
    if (valid) {
      this.projectService.saveProject(this.project, this.id)
        .subscribe(response => {
          Swal.fire('Success', 'Project berhasil ditambahkan', 'success');
          this.router.navigate(['/dashboard/project']);
        }, error => {
          Swal.fire('Failed', 'Gagal menambahkan project', 'error');
        });
    }
  }

  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
        for (const user of this.loadedUser) {
          if (user.userRole === '01') {
            this.userPMO.push(user);
          }
          if (user.userRole === '02') {
            this.userPM.push(user);
          }
          if (user.userRole === '03') {
            this.userCoPM.push(user);
          }
          if (user.userRole === '05') {
            this.userDepartmentHead.push(user);
          }
        }

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

  private setDataToForm(projectForm): void {
    this.project = projectForm;
    if (this.project) {
      this.projectForm.get('id').setValue(this.project.id);
      this.projectForm.get('projectCode').setValue(this.project.projectCode);
      this.projectForm.get('projectName').setValue(this.project.projectName);
      this.projectForm.get('pmo').setValue(this.project.pmo);
      this.projectForm.get('pm').setValue(this.project.pm);
      this.projectForm.get('benefit').setValue(this.project.benefit);
      this.projectForm.get('description').setValue(this.project.description);
      this.projectForm.get('coPM').setValue(this.project.coPM);
      this.projectForm.get('divisiUser').setValue(this.project.divisiUser);
      this.projectForm.get('directorateUser').setValue(this.project.directorateUser);
      this.projectForm.get('status').setValue(this.project.status);
      this.projectForm.get('targetLive').setValue(this.project.targetLive);
      this.projectForm.get('prosentaseProject').setValue(this.project.prosentaseProject);
      this.projectForm.get('budget').setValue(this.project.budget);
      this.projectForm.get('contracted_value').setValue(this.project.contracted_value);
      this.projectForm.get('paymentRealization').setValue(this.project.paymentRealization);
      this.projectForm.get('keyword').setValue(this.project.keyword);
      this.projectForm.get('departmentHead').setValue(this.project.departmentHead);
      this.projectForm.get('score').setValue(this.project.score);
      this.projectForm.get('weight').setValue(this.project.weight);
      this.projectForm.get('categoryActivity').setValue(this.project.categoryActivity);
      this.projectForm.get('categoryInitiative').setValue(this.project.categoryInitiative);
      this.projectForm.get('statusProject').setValue(this.project.statusProject);
    }
  }

  form(property): AbstractControl {
    return this.projectForm.get(property);
  }

  onGolistProject() {
    this.router.navigate(['/dashboard/project']);
  }
}
