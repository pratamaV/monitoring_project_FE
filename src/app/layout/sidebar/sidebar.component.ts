import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../master/task/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel, TaskModel2} from '../../master/task/task.model';
declare var jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {


  numberTask = 0;
  token = window.sessionStorage.getItem('token');
  tokenParse = JSON.parse(this.token);
  user = this.tokenParse.user;
  paramNull = {
    taskDoc: null,
    statusDone: null,
    releaseName: null,
    projectName: null,
    estStartDate: null
  };


  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onGetTaskByUserId();
    // (function ($) {
    //   $(document).ready(function(){
    //     $(".push_menu").click(function(){
    //          $(".wrapper").toggleClass("active");
    //     });
    // });
    // })(jQuery);
  }

  onGetTaskByUserId() {
    this.taskService.getTaskByUserId(localStorage.getItem('idUser'), this.paramNull)
      .subscribe((data)  => {
        for (const task of data.content) {
          if (task.statusDone === 'NOT STARTED'){
            this.numberTask = this.numberTask + 1;
          }
        }
      }, error => {
        alert(error);
      });
  }


  logout(){
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('STATE');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  /* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
 openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
 closeNav() {
  this.getStyle()
  // console.log('kena ga');


}

getStyle(){
  // console.log('yg ini')
  return {
    'width': '0px;'
  }
  // if ((estEndDate < this.currentDate) && statusDone === 'NOT STARTED') {
  //   return {
  //     'background-color': 'rgb(255, 82, 82)',
  //     color : 'white'
  //   };
  // } else if ((estEndDate < this.currentDate) && statusDone === 'ON_PROGRESS'){
  //   return {
  //     'background-color': 'orange',
  //     color : 'black'
  //   };
  // }
}

}
