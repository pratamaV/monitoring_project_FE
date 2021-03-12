import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../../project/project-service.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {UserModel, UserModel2} from "../user.model";
import {ProjectModel2} from "../../project/project.model";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  loadedUser: UserModel[] = [];
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListUser();
  }

  onGetListUser() {
    this.userService.getAllUser()
      .subscribe(data => {
        this.loadedUser = data;
      }, error => {
        alert(error);
      });
  }

  updateUser(user: UserModel2){
    this.router.navigateByUrl('/dashboard/user/form-user/' + user.id, {state: user});
  }

  onAddUser(){
    this.router.navigate(['/dashboard/user/form-user']);
  }

}
