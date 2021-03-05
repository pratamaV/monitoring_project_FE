import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {ProjectServiceService} from '../project-service.service';
import {DivisionModel, ProjectModel, ProjectModel2, UserModel} from '../project.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent implements OnInit {
  projectForm: FormGroup;
  project: ProjectModel2;
  loadedUser: UserModel[] = [];
  loadedDivision: DivisionModel[] = [];
  id: string;
  pmId: '';
  pmoId: '';
  coPMId: '';
  divisionId: '';

  constructor(private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.buildForm();
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
      projectName: new FormControl(null),
      pmo: new FormControl(null),
      pm: new FormControl(null),
      benefit: new FormControl(null),
      description: new FormControl(null),
      coPM: new FormControl(null),
      divisiUser: new FormControl(null),
      directorateUser: new FormControl(null),
      status: new FormControl(null),
      targetLive: new FormControl(null),
      prosentaseProject: new FormControl(0),
      budget: new FormControl(null),
      contracted_value: new FormControl(null),
      paymentRealization: new FormControl(null),
      score: new FormControl(null),
      weight: new FormControl(null),
      categoryActivity: new FormControl(null),
      categoryInitiative: new FormControl(null),
      statusProject: new FormControl('aktif')
    });
  }


  onSaveProject(postData, valid: boolean) {
    this.project = {
      id: postData.id,
      projectCode: postData.projectCode,
      projectName: postData.projectName,
      pmo: {
        id: postData.pmo
      },
      pm: {
        id: postData.pm
      },
      benefit: postData.benefit,
      description: postData.description,
      coPM: {
        id: postData.coPM
      },
      divisiUser: {
        id: postData.divisiUser
      },
      directorateUser: postData.directorateUser,
      status: postData.status,
      targetLive: postData.targetLive,
      prosentaseProject: postData.prosentaseProject,
      budget: postData.budget,
      contracted_value: postData.contracted_value,
      paymentRealization: postData.paymentRealization,
      score: postData.score,
      weight: postData.weight,
      categoryActivity: postData.categoryActivity,
      categoryInitiative: postData.categoryActivity,
      statusProject: postData.statusProject
    };
    if (valid) {
      this.projectService.saveProject(this.project, this.id)
        .subscribe(response => {
          this.router.navigate(['/dashboard/project']);
        }, error => {
          alert(error.message);
        });
    }
  }

  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
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

}
