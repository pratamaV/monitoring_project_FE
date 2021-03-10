import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  year: number;

  constructor() { }

  ngOnInit(): void {
    var d = new Date();
    this.year = d.getFullYear();
  }

}
