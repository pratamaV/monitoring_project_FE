import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../task.model';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {UserModel} from '../../project/project.model';
import {ProjectServiceService} from '../../project/project-service.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  filterForm: FormGroup;
  task: TaskModel;
  assigntoId: '';
  loadedTask: TaskModel2;
  loadedUser: UserModel[] = [];
  paramNull = {
    assignTo: null,
    statusDone: null
  };
  constructor(private taskService: TaskService,
              private projectService: ProjectServiceService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.onGetAllUser();
    this.onGetAllTask();
  }

  onGetAllTask() {
    this.filterForm.get('assignTo').setValue(null);
    this.filterForm.get('statusDone').setValue(null);
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'), this.paramNull)
      .subscribe(data => {
        this.loadedTask = data;
        console.log(this.loadedTask);
      }, error => {
        alert(error);
      });
  }

  onGetAllUser() {
    this.projectService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
      }, error => {
        alert(error);
      });
  }

  private buildForm(): void {
    this.filterForm  = new FormGroup({
      assignTo: new FormControl(null),
      statusDone: new FormControl(null),
    });
  }

  form(property): AbstractControl {
    return this.filterForm.get(property);
  }

  onGetFilterTask(param) {
    console.log(param);
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'), param)
      .subscribe(data => {
        this.loadedTask = data;
        console.log(this.loadedTask);
      }, error => {
        alert(error);
      });
  }

  // tslint:disable-next-line:typedef
  onSaveTaskByReleaseId(){
    this.router.navigate(['/dashboard/task/form-task']);
  }

  onDoneTask(task, idRelease){
    this.task = {
      id: task.id,
      taskName: task.taskName,
      taskCode: task.taskCode,
      assignedTo: JSON.stringify({
        id: task.assignedTo.id
      }) ,
      score: task.score,
      weight: task.weight,
      statusDone: 'Ya',
      taskProsentase: task.taskProsentase,
      finalTarget: new Date(task.finalTarget),
      taskDoc: task.taskDoc,
      release: JSON.stringify({
        id: task.release.id
      })
    };
    this.taskService.onDoneTask(this.task, idRelease)
      .subscribe(data => {
        alert('success');
        window.location.reload();
      }, error => {
        alert(error.message);
      });
  }

  downloadTaskDoc(taskCode){
    console.log(taskCode);
    this.taskService.getTaskDocument(taskCode).subscribe((response) => {
      alert('success');
    }, error => {
      alert('tidak ada dokumen yang di upload');
    });
  }
}
