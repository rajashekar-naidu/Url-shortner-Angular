import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  //styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  fName:string;
  lName:string;
  uId:string;
  urls:any;
  urlsById:any;
  failedToGetDetails:boolean;
 
  constructor(private _auth:AuthService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
    this.getUserDetailsBasedOnId(this.uId);
    this.getAllUrlDetails();
  }
  
  getUserDetailsBasedOnId(uId){
    if(uId === null)
    uId = this._auth.getuId();
    console.log(uId);

    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        this.fName =data.fName;
        this.lName =data.lName;
      },
      error => {
        console.log(error);
      });
  }

  getAllUrlDetails(){
    this._auth.getAllUrls()
    .subscribe(
      data => {
        console.log(data.results);
        console.log(data.results.clicks);
        
        this.urls = data.results || [];
        console.log(this.urls.clicks);
        this.urlsById = data.results.filter(e => e.user_id === this.uId);
        console.log(this.urlsById);
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
      });
  }

  failedToGetDetailsAlert(){
    this.failedToGetDetails = false;
  }
}
