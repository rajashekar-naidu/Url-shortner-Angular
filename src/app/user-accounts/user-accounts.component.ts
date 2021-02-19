import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  //styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent implements OnInit {
  users:any;
  cantFetchAllUserDetails:boolean;
  cantRemoveUser:boolean;
  length;


  constructor(private _router:Router, private _auth:AuthService) { }

  ngOnInit() {
    this.getAllUserDetails();
  }

  addUser(){
    this._router.navigate(['user-accounts/add-user']);
  }

  getAllUserDetails(){
    this._auth.getAllUsers()
    .subscribe(
      data => {
        this.users = data.results || [];
        this.length = this.users.length;
        console.log(this.users);
        console.log(this.users.length);
      },
      error => {
        console.log(error);
        this.cantFetchAllUserDetails = true;
      });
  }

  removeUser(uId){
    this._auth.removeUser(uId)
      .subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log(err);
          this.cantRemoveUser = true;
        }
      )
  }

  cantFetchAllUserDetailsAlert(){
    this.cantFetchAllUserDetails=false;
  }

  cantRemoveUserAlert(){
    this.cantRemoveUser=false;
  }
}
