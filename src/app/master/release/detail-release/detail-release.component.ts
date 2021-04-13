import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReleaseModel2 } from '../release.model';
import { ReleaseService } from '../release.service';

@Component({
  selector: 'app-detail-release',
  templateUrl: './detail-release.component.html',
  styleUrls: ['./detail-release.component.css']
})
export class DetailReleaseComponent implements OnInit {

  release : ReleaseModel2

  constructor(private releaseService : ReleaseService,
              private router : Router
    ) { }

  ngOnInit(): void {
    this.onGetReleaseById();
  }

  onGetReleaseById(){
    this.releaseService.getReleaseById(localStorage.getItem('releaseId'))
    .subscribe( data => {
      this.release = data;
    }, error => {
      alert(error.message);
    } )
  }

  goToReleaseList(){
    this.router.navigate(['dashboard/release/release-view'])
  }


}
