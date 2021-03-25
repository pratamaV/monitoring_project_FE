import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('idUser');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('STATE');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
