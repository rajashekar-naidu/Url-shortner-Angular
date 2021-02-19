import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent implements OnInit {
  isExpanded = false;
  isRTL: boolean;
 fName:string ;
 lName:string ;
 uId = this._auth.getuId();
 serverError:boolean;
 result:any;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(private appService: AppService, private layoutService: LayoutService, private _auth:AuthService, private _router:Router) {
    this.isRTL = appService.isRTL;
  }

  ngOnInit(){
    this.getUserName(this.uId);
  }

  getUserName(uId){
    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        this.fName = data.fName;
        this.lName = data.lName;
      },
      error => {
        console.log(error);
        if(error.name === "HttpErrorResponse")
        this.serverError=true;
      });
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  getLoggedOut(){
    this._auth.logoutUser()
    .subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      });  
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    this._router.navigate(['/login']);
  }

  closeServerAlert(){
    this.serverError=false;
  }
}
