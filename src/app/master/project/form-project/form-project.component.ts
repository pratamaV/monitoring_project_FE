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
  budgetString : string;
  ContractedValueString : string;
  PaymentRealizationString : string;

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
      benefit: new FormControl(null),
      status: new FormControl(null),
      prosentaseProject: new FormControl(0),
      budget: new FormControl(null),
      contractedValue: new FormControl(null),
      paymentRealization: new FormControl(null),
      projectDependency : new FormControl(null),
      score: new FormControl(null, [Validators.required, Validators.pattern('^(?:[1-9]|0[1-9]|10)$')]),
      weight: new FormControl(null),
      categoryInitiative: new FormControl(null, [Validators.required]),
      statusProject: new FormControl('Active'),
      lineItem: new FormControl(null, [Validators.required])
    });
  }

  currencyPipes(){
    this.projectForm.valueChanges.subscribe( form => {
      if(form.budget){
        this.budgetString = form.budget + ''
        this.projectForm.patchValue({
          budget : this.currencyPipe.transform(this.budgetString.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
      if(form.contracted_value){
        this.ContractedValueString = form.contracted_value + ''
        this.projectForm.patchValue({
          contracted_value : this.currencyPipe.transform(this.ContractedValueString.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
        }, {emitEvent: false})
      }
      if(form.paymentRealization){
        this.PaymentRealizationString = form.paymentRealization + ''
        this.projectForm.patchValue({
          paymentRealization : this.currencyPipe.transform(this.PaymentRealizationString.replace(/\D+/g, '').replace(/^0+/, ''), 'RP ', 'symbol', '1.0-0')
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
      this.budgetString = postData.budget + '';
      this.split = this.budgetString.split(',');
      this.join1 = this.split.join('');
      this.match = this.join1.match(/\d/g);
      this.join2 = this.match.join('');
      this.fixBudget = parseInt(this.join2);
    }
    if(postData.contracted_value){
      this.ContractedValueString = postData.contracted_value + '';
      this.split = this.ContractedValueString.split(',');
      this.join1 = this.split.join('');
      this.match = this.join1.match(/\d/g);
      this.join2 = this.match.join('');
      this.fixContractedValue = parseInt(this.join2);
    }
    if(postData.paymentRealization){
      this.PaymentRealizationString = postData.paymentRealization + '';
      this.split = this.PaymentRealizationString.split(',');
      this.join1 = this.split.join('');
      this.match = this.join1.match(/\d/g);
      this.join2 = this.match.join('');
      this.fixPaymentRealization = parseInt(this.join2);
    }

    this.project = {
      id: postData.id,
      projectCode: postData.projectCode,
      projectName: postData.projectName,
      benefit: postData.benefit,
      status: postData.status,
      prosentaseProject: postData.prosentaseProject,
      budget: this.fixBudget,
      contractedValue: this.fixContractedValue,
      paymentRealization: this.fixPaymentRealization,
      score: postData.score,
      weight: postData.weight,
      categoryInitiative: postData.categoryInitiative,
      statusProject: postData.statusProject,
      projectDependency: postData.projectDependency,
      lineItem: postData.lineItem
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
      this.projectForm.get('benefit').setValue(this.project.benefit);
      this.projectForm.get('status').setValue(this.project.status);
      this.projectForm.get('prosentaseProject').setValue(this.project.prosentaseProject);
      this.projectForm.get('budget').setValue(this.project.budget);
      this.projectForm.get('contractedValue').setValue(this.project.contractedValue);
      this.projectForm.get('paymentRealization').setValue(this.project.paymentRealization);
      this.projectForm.get('projectDependency').setValue(this.project.projectDependency);
      this.projectForm.get('score').setValue(this.project.score);
      this.projectForm.get('weight').setValue(this.project.weight);
      this.projectForm.get('categoryInitiative').setValue(this.project.categoryInitiative);
      this.projectForm.get('statusProject').setValue(this.project.statusProject);
      this.projectForm.get('lineItem').setValue(this.project.lineItem);
    }
  }

  form(property): AbstractControl {
    return this.projectForm.get(property);
  }

  onGolistProject() {
    this.router.navigate(['/dashboard/project']);
  }
}
