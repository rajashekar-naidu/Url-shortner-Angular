import { Component, Input, HostBinding, OnInit } from '@angular/core';
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

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') hostClassMain = true;

  constructor(private appService: AppService, private layoutService: LayoutService, private _auth:AuthService) {
    this.isRTL = appService.isRTL;
  }

  ngOnInit(){
    this.getUserName(this._auth.getuId());
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
      });
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  getLoggedOut(){
    return this._auth.logoutUser();
  }
}
