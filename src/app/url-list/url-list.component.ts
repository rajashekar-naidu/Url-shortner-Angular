import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit{
  isReadonly = true;
  urls:any;
  length;
  urlRemoved:boolean;
  urlNotRemoved:boolean;
  cantFetchUrls:boolean;

  constructor(private appService: AppService, private _router:Router, private _auth:AuthService) {
    this.appService.pageTitle = 'Short URL List';
  }

  ngOnInit(){
    if(this._auth.getRole()==="User")
    this._router.navigate(['/shorturl']);
  if(this._auth.getRole()===false)
    this._router.navigate(['/']);
    this.getAllUrlDetails();
  }

  getAllUrlDetails(){
    this._auth.getAllUrls()
    .subscribe(
      data => {
        this.urls = data.results || [];
        this.length = this.urls.length;
        console.log(this.urls);
      },
      error => {
        console.log(error);
        this.cantFetchUrls = true;
      });
  }

  removeUrl(urlId){
    this._auth.removeUrl(urlId)
      .subscribe(
        res => {
          this.ngOnInit();
          this.urlRemoved=true;
        },
        err => {
          console.log(err);
          this.urlNotRemoved=true;
        }
      )
  }

  removeUrlAlert(){
    this.urlRemoved=false;
  }

  removeUrlFailAlert(){
    this.urlNotRemoved=false;
  }

  cantFetchUrlsAlert(){
    this.cantFetchUrls=false;
  }

}
