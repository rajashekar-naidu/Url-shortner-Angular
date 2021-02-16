import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent implements OnInit {
  fName:string;
  lName:string;
  uId =this._auth.getuId();
  urls:any;
  urlsById:any;
 
  constructor(private _auth:AuthService) { }

  ngOnInit() {
    this.getUserDetailsBasedOnId(this._auth.getuId());
    this.getAllUrlDetails();
  }
  
  getUserDetailsBasedOnId(uId){
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
        this.urls = data.results || [];
        console.log(this.urls);
        this.urlsById = data.results.filter(e => e.user_id === this.uId);
        console.log(this.urlsById);
      },
      error => {
        console.log(error);
      });
  }

 // getUrlsByfind(uId){
 //   return this.urls.find(x => x.uId === uId);
 // }
  
}
