import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterTrainingModel, TrainingModel } from '../training.model';
import { UserModel } from '../../user/user.model';
import { DivisionModel } from '../../project/project.model';
import { TrainingService } from '../training.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'approve-training-aa',
  templateUrl: './approve-training-aa.component.html',
  styleUrls: ['./approve-training-aa.component.css']
})
export class ApproveTrainingAaComponent implements OnInit {

  isLoading = false;
  trainingForm: FormGroup;
  training: TrainingModel;
  requestPayload : any;
  masterTraining: MasterTrainingModel[] = [];
  idUsers: string;
  divisionCode: string;
  loadedUser: UserModel[] = [];
  userPMO: UserModel[] = [];
  userPM: UserModel[] = [];
  userCoPM: UserModel[] = [];
  userDepartmentHead: UserModel[] = [];
  loadedDivision: DivisionModel[] = [];
  id: string;
  split: any;
  join1: any;
  match : any;
  join2: any;
  budgetString : string;
  ContractedValueString : string;
  PaymentRealizationString : string;
  trainingName : any[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonths: { [key: string]: boolean } = {};
  selectedMonthsArray: string[] = [];

  constructor(private trainingService: TrainingService,
              private router: Router,
              private route: ActivatedRoute,
              private currencyPipe : CurrencyPipe
              ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllUser();
    this.onGetAllTrainingName();
    this.route.params.subscribe(params => {      
      if (params && params.id) {
        const id: string = params.id;
        this.trainingService.getTrainingById(id)
          .subscribe((response) => {
              // this.id = id;
              this.setDataToForm(response.data[0]);
            }, error => {
              alert(error.message);
            }
          );
      }
    });
  }

  updateSelectedMonths() {
    this.selectedMonthsArray = this.months.filter(month => this.selectedMonths[month]);
    console.log(this.selectedMonthsArray);
    
  }

  private buildForm(): void {
    this.trainingForm = new FormGroup({
      id: new FormControl(null),
      competence: new FormControl(null, [Validators.required]),
      subCompetence: new FormControl(null),
      trainingName: new FormControl(null),
      businessIssues: new FormControl(null),
      performanceIssues: new FormControl(null),
      competencyIssues: new FormControl(null),
      timeline: new FormControl(null)
    });
  }

  setDataToForm(data : any): void {
    this.training = data;
    if (this.training) {
      this.trainingForm.get('id').setValue(this.training.id);
      this.trainingForm.get('competence').setValue(this.training.competence);
      this.trainingForm.get('subCompetence').setValue(this.training.subCompetenceCode);
      this.trainingForm.get('trainingName').setValue(this.training.masterTraining.id);
      this.trainingForm.get('businessIssues').setValue(this.training.businessIssues);
      this.trainingForm.get('performanceIssues').setValue(this.training.performanceIssues);
      this.trainingForm.get('competencyIssues').setValue(this.training.competencyIssues);
    }
  }

  compareDivision(c1: DivisionModel, c2: DivisionModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareUser(c1: UserModel, c2: UserModel): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSaveTraining(postData, valid: boolean) {
    
    this.isLoading = true;
    var idTraining = null;
    if(postData.id != null){
      idTraining = postData.id;
    }
    
    console.log('id : ' + idTraining);
    console.log('month : [' + this.selectedMonthsArray + ']');
    
    this.idUsers = JSON.parse(window.sessionStorage.getItem('token')).user.id;
    this.divisionCode = JSON.parse(window.sessionStorage.getItem('token')).user.divisiUser.divisionCode;
    
    this.requestPayload = {
      idTraining: idTraining,
      competence: postData.competence,
      subCompetenceCode: postData.subCompetence,
      idMasterTraining: postData.trainingName,
      businessIssues : postData.businessIssues,
      performanceIssues : postData.performanceIssues,
      competencyIssues : postData.competencyIssues,
      idUsers: this.idUsers,
      divisionCode: this.divisionCode,
      type: 'T',
      status: '2',
      timeline: '['+this.selectedMonthsArray+']'
    };
  
    this.trainingService.registerTraining(this.requestPayload)
    .subscribe(
      data => {
        if(data.responseCode === '00'){
          this.isLoading = false;
          Swal.fire('Success', 'Success update training', 'success');
        } else {
          Swal.fire('Failed', data.responseCode, 'error');
        }
        // window.location.reload();
        this.router.navigate(['/dashboard/training/review/aa']);
      },
      error => {
        Swal.fire('Success', error, 'error');
        alert(error);
      }
    );
  }

  onGetAllUser() {
    // this.projectService.getAllUser()
    //   .subscribe(data => {
    //     this.loadedUser = data;
    //     for (const user of this.loadedUser) {
    //       if (user.userRole === '01') {
    //         this.userPMO.push(user);
    //       }
    //       if (user.userRole === '02') {
    //         this.userPM.push(user);
    //       }
    //       if (user.userRole === '03') {
    //         this.userCoPM.push(user);
    //       }
    //       if (user.userRole === '05') {
    //         this.userDepartmentHead.push(user);
    //       }
    //     }

    //   }, error => {
    //     alert(error);
    //   });
  }

  onGetAllTrainingName() {
    this.trainingService.getAllTrainingMaster()
      .subscribe(data => {
        this.masterTraining = data.data;
      }), error => {
        alert(error);
      }
    // this.projectService.getAllDivison()
    //   .subscribe(data => {
    //     this.loadedDivision = data;
    //   }, error => {
    //     alert(error);
    //   });

    // this.releaseService.getAllRelease()
    // .subscribe(data => {
    //   this.releaseName = data;
    // }, error => {
    //   alert(error);
    // });
  }

  selectOption(values : any){
    console.log('ini values : ' + values);
  }

  form(property): AbstractControl {
    return this.trainingForm.get(property);
  }

  onGolistTraining() {
    this.router.navigate(['/dashboard/training/review/aa']);
  }

}
