import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
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
  logDetailsById:any;
  failedToGetDetails:boolean;
 
  constructor(private _appService:AppService, private _auth:AuthService, private activatedRoute:ActivatedRoute, private _router:Router) {
    this._appService.pageTitle = 'User Activity';
   }

  ngOnInit() {
  if(this._auth.getRole()===false)
    this._router.navigate(['/']);
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
    this.getUserDetailsBasedOnId(this.uId);
    this.getAllUrlDetails();
    this.getLogDetailsByID(this.uId);
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
        this.failedToGetDetails = true;
      });
  }

  getLogDetailsByID(uId){
    if(uId === null)
    uId = this._auth.getuId();
    console.log(uId);

    this._auth.userLogsByID(uId)
    .subscribe(
      data => {
        console.log(data);
        this.logDetailsById = data || [];
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
    });
  }

  getAllUrlDetails(){
    this._auth.getAllUrls()
    .subscribe(
      data => {        
        this.urls = data.results || [];
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
