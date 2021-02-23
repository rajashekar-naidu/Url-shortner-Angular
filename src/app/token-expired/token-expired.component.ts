import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrls: ['./token-expired.component.scss']
})
export class TokenExpiredComponent implements OnInit{ 

  ngOnInit(){
    if(this._auth.getRole()===false)
      this._router.navigate(['/']);
  }

  constructor(private _appService: AppService, private _router:Router, private _auth:AuthService) { 
    this._appService.pageTitle = 'Token Expired page';
  }

  submit(){
    this._router.navigate(['/']);
  }
}
