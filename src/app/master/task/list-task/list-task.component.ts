import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../task.model';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {
  task: TaskModel;
  loadedTask: TaskModel2;
  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onGetAllTask();
  }

  onGetAllTask() {
    this.taskService.getTaskByReleaseId(localStorage.getItem('releaseId'))
      .subscribe(data => {
        this.loadedTask = data;
        console.log(this.loadedTask);
      }, error => {
        alert(error);
      });
  }

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
