import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectServiceService} from "../../project/project-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IssuedService} from "../issued.service";
import {IssuedModel} from "../issued.model";
import Swal from "sweetalert2";
import {LogErrorModel} from "../../log-error.model";
import {LogErrorService} from "../../log-error.service";

@Component({
  selector: 'app-form-issued',
  templateUrl: './form-issued.component.html',
  styleUrls: ['./form-issued.component.css']
})
export class FormIssuedComponent implements OnInit {
  idLog: string;
  logError: LogErrorModel;
  issuedForm: FormGroup;
  issued: IssuedModel;
  id: string;
  constructor(private issuedService: IssuedService,
              private router: Router,
              private route: ActivatedRoute,
              private logErrorService: LogErrorService) { }

  ngOnInit(): void {
    this.buildForm();
    this.route.params.subscribe(params => {
      if (params && params.id) {
        const id: string = params.id;
        this.issuedService.getIssuedById(id)
          .subscribe((response) => {
              this.id = id;
              this.setDataToForm(response);
            }, error => {
              alert(error.message);
            this.logError = {
              errorMessage: error.message,
              incidentDate: new Date(),
              function: 'Set Data Form Issued',
              isActive: true
            };
            this.logErrorService.saveLogError(this.logError, this.idLog)
              .subscribe(response => {
                // tslint:disable-next-line:no-shadowed-variable
              }, error => {
                alert('Gagal merekam kesalahan');
              });
            }
          );
      }
    });
  }

  private buildForm(): void {
    this.issuedForm = new FormGroup({
      id: new FormControl(null),
      issuedDescription: new FormControl(null, [Validators.required]),
      issuedDate: new FormControl(new Date()),
      issuedPlan: new FormControl(null, [Validators.required]),
      estEnddate: new FormControl(null, [Validators.required]),
      pic: new FormControl(null, [Validators.required]),
      status: new FormControl('Open'),
      release: new FormControl(localStorage.getItem('idRelease')),
    });
  }

  onSaveIssued(postData, valid: boolean) {
    this.issued = {
      id: postData.id,
      issuedDescription: postData.issuedDescription,
      issuedDate: postData.issuedDate,
      issuedPlan: postData.issuedPlan,
      estEnddate: postData.estEnddate,
      pic: postData.pic,
      status: postData.status,
      release: {
        id: postData.release
      }
    };
    if (valid) {
      this.issuedService.saveIssued(this.issued, this.issued.id)
        .subscribe(response => {
          Swal.fire( 'Success', 'Isu berhasil di simpan' , 'success'  );
          this.router.navigate(['/dashboard/issued']);
        }, error => {
          Swal.fire( 'Failed', 'Gagal menyimpan isu' , 'error'  );
          this.logError = {
            errorMessage: error.message,
            incidentDate: new Date(),
            function: 'Save Issue',
            isActive: true
          };
          this.logErrorService.saveLogError(this.logError, this.idLog)
            .subscribe(response => {
              // tslint:disable-next-line:no-shadowed-variable
            }, error => {
              alert('Gagal merekam kesalahan');
            });
        });
    }
  }

  private setDataToForm(issuedForm): void {
    this.issued = issuedForm;
    if (this.issued) {
      this.issuedForm.get('id').setValue(this.issued.id);
      this.issuedForm.get('issuedDescription').setValue(this.issued.issuedDescription);
      this.issuedForm.get('issuedDate').setValue(this.issued.issuedDate);
      this.issuedForm.get('issuedPlan').setValue(this.issued.issuedPlan);
      this.issuedForm.get('estEnddate').setValue(this.issued.estEnddate);
      this.issuedForm.get('pic').setValue(this.issued.pic);
      this.issuedForm.get('release').setValue(this.issued.release);
    }
  }

  form(property): AbstractControl {
    return this.issuedForm.get(property);
  }

  onGolistIssue(){
    this.router.navigate(['/dashboard/issued'])
  }

}
