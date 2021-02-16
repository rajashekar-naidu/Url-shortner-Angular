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

  constructor(private _router:Router, private _auth:AuthService) { }

  ngOnInit() {
    this.getAllUserDetails();
  }

  addUser(){
    this._router.navigate(['/signup']);
  }

  getAllUserDetails(){
    this._auth.getAllUsers()
    .subscribe(
      data => {
        this.users = data.results || [];
        console.log(this.users);
      },
      error => {
        console.log(error);
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
        }
      )
  }
}
