import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  token = window.sessionStorage.getItem('token');
  tokenParse = JSON.parse(this.token);
  user = this.tokenParse.user;
  constructor() { }

  ngOnInit(): void {
  }

}
