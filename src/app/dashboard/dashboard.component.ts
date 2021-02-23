import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalUrlRegistered;
  totalUrlRegisteredIn24Hr;
  totalUserRegistered;
  totalUserRegisteredIn24Hr;
  UsersActivityDashboard:any;
  urlsActivityDashboard:any;
 // usersDetails:any[];
 loginSuccessful:boolean;

  

  constructor(private appService:AppService, private _auth:AuthService, private _router:Router) { 
    this.appService.pageTitle = 'DashBoard';
  }

  ngOnInit() {
    if(this._auth.getRole()==="User")
      this._router.navigate(['/shorturl']);
    if(this._auth.getRole()===false)
      this._router.navigate(['/']);
    this.getAllDashboardDetails();
  }

  getAllDashboardDetails(){
    this._auth.getDashboard()
    .subscribe(
      data => {
       this.totalUrlRegistered = data.totalUrlRegistered;
       this.totalUrlRegisteredIn24Hr = data.totalUrlRegisteredIn24Hr;
       this.totalUserRegistered = data.totalUserRegistered;
       this.totalUserRegisteredIn24Hr = data.totalUserRegisteredIn24Hr;
       this.UsersActivityDashboard = data.recent10UserACtivities;
       console.log(this.UsersActivityDashboard);
     //  this.getUserDetailsByID();
       this.urlsActivityDashboard = data.recent10UrlGenerated;
       console.log(this.urlsActivityDashboard);
      },
      error => {
        console.log(error);
      //  this.failedToGetDetails=true;
      });
  }

  // getUserDetailsByID(){
  //   this.UsersActivityDashboard.forEach(userInfo => {
  //     console.log(userInfo.UserID);
  //     this._auth.getUserDetails(userInfo.UserID)
  //     .subscribe(
  //       data =>{
  //         console.log(data); 
  //         this.usersDetails = this.usersDetails.push("data"); 
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //     )
  //   });
  // }

  loginSuccessfulAlert(){
    this.loginSuccessful=false;
  }

}
