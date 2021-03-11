import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css']
})
export class DetailTaskComponent implements OnInit {

  isLoading = false;
  loadTask: [] = [];
  page = 1;
  pageSize = 3;
  totalItems = 0;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  deleteTask(id: string){
    alert("Apakah anda yakin untuk mengahapus task ini?")
  }

  onStatusChange(){
    alert("Status sudah di ubah")
  }

}
