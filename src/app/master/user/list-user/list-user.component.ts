import { Component, OnInit } from '@angular/core';
import {ProjectServiceService} from "../../project/project-service.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {UserModel, UserModel2} from "../user.model";
import {ProjectModel2} from "../../project/project.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  loadedUser: UserModel[] = [];
  isLoading = false;

  page = 1;
  pageSize = 10;
  totalItems = 0;
  searchByUsername = '';
  orderBy = 'username';
  sort = 'ASC';
  userRoleNew = JSON.parse(window.sessionStorage.getItem('token')).user.userRole;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.onGetListUser();
  }

  onGetListUser() {
    this.isLoading = true;
    this.userService.getAllUser(this.searchByUsername, this.orderBy, this.sort, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.loadedUser = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        alert(error);
      });
  }

  onPageChanges(event) {
    this.page = event;
    this.onGetListUser();
  }

  updateUser(user: UserModel2){
    this.router.navigateByUrl('/dashboard/user/form-user/' + user.id, {state: user});
  }

  onAddUser(){
    this.router.navigate(['/dashboard/user/form-user']);
  }

  detailTask(id: string) {
    localStorage.setItem('userIdTask', id);
    this.router.navigate(['/dashboard/task/user-task']);
  }

  updateActiveInactive(id: string, status) {
    this.userService.changeStatusUser(id, status).subscribe((response) => {
      Swal.fire('Success', 'Berhasil mengubah status user', 'success');
      this.onGetListUser();
    }, error => {
      Swal.fire('Failed', 'Gagal mengubah status user', 'error');
    });
  }

  searchLive() {
    this.userService.getAllUser(this.searchByUsername, this.orderBy, this.sort, this.page)
      .subscribe(data => {
        this.loadedUser = data.content;
        this.totalItems = data.totalElements;
      }, error => {
        alert(error);
      });
  }
}
