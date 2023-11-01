import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DivisionModel, ProjectModel2 } from '../../project/project.model';
import { UserModel } from '../../user/user.model';
import { TrainingService } from '../training.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MasterTrainingModel, TrainingModel } from '../training.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-training-non',
  templateUrl: './register-training-non.component.html',
  styleUrls: ['./register-training-non.component.css']
})
export class RegisterTrainingNonComponent implements OnInit {

  isLoading = false;
  trainingForm: FormGroup;
  training: TrainingModel;
  requestPayload : any;
  masterTraining: MasterTrainingModel[] = [];
  trainingName : MasterTrainingModel[] = [];
  idUsers: string;
  divisionCode: string;
  selectedSubCompetence: string;
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
  }

  private buildForm(): void {
    this.trainingForm = new FormGroup({
      id: new FormControl(null),
      trainingName: new FormControl(null, [Validators.required]),
      trainingDate: new FormControl(null),
      trainingParticipants: new FormControl(null),
      trainingType: new FormControl(null),
      trainingCost: new FormControl(null),
      consumptionCost: new FormControl(null),
      accommodationCost: new FormControl(null),
      file: new FormControl(null)
    });
  }

  setDataToForm(data : any): void {
    this.training = data;
    if (this.training) {
      this.trainingForm.get('id').setValue(this.training.id);
      this.trainingForm.get('trainingName').setValue(this.training.trainingName);
      this.trainingForm.get('trainingDate').setValue(this.training.trainingDate);
      this.trainingForm.get('trainingParticipants').setValue(this.training.trainingParticipants);
      this.trainingForm.get('trainingType').setValue(this.training.trainingType);
      this.trainingForm.get('trainingCost').setValue(this.training.trainingCost);
      this.trainingForm.get('consumptionCost').setValue(this.training.consumptionCost);
      this.trainingForm.get('accommodationCost').setValue(this.training.accommodationCost);
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
    
    this.idUsers = JSON.parse(window.sessionStorage.getItem('token')).user.id;
    this.divisionCode = JSON.parse(window.sessionStorage.getItem('token')).user.divisiUser.divisionCode;
    
    this.requestPayload = {
      idTraining: idTraining,
      trainingName: postData.trainingName,
      trainingDate: postData.trainingDate,
      trainingParticipants: postData.trainingParticipants,
      trainingType : postData.trainingType,
      trainingCost : postData.trainingCost,
      consumptionCost : postData.consumptionCost,
      accommodationCost : postData.accommodationCost,
      idUsers: this.idUsers,
      divisionCode: this.divisionCode,
      status: '0',
      type: 'N'
    };
  
    this.trainingService.registerTraining(this.requestPayload)
    .subscribe(
      data => {
        if(data.responseCode === '00'){
          this.isLoading = false;
          Swal.fire('Success', 'Success submit training', 'success');
        } else {
          Swal.fire('Failed', data.responseCode, 'error');
        }
        // window.location.reload();
        this.router.navigate(['/dashboard/training/non']);
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
  }

  onSelectedSubCompetence(){
    this.trainingName = [];
    Object.keys(this.masterTraining).forEach((key) => {
      if(this.masterTraining[key].subCompetenceCode === this.selectedSubCompetence){
        this.trainingName.push(this.masterTraining[key]);
      }
    });

  }

  form(property): AbstractControl {
    return this.trainingForm.get(property);
  }

  onGolistTraining() {
    this.router.navigate(['/dashboard/training/non']);
  }

}
