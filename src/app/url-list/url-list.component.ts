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

  constructor(private appService: AppService, private _router:Router, private _auth:AuthService) {
    this.appService.pageTitle = 'URL List';
  }

  ngOnInit(){
    this.getAllUrlDetails();
  }

  toggleEdit(){
    this.isReadonly = !this.isReadonly;
    // route to url shortner page with copied url data and populate and generate it there
  }

  urlDetails(){
    this._router.navigate(['/url-access-list']);
  }

  getAllUrlDetails(){
    this._auth.getAllUrls()
    .subscribe(
      data => {
        this.urls = data.results || [];
        console.log(this.urls);
      },
      error => {
        console.log(error);
      });
  }

  removeUrl(urlId){
    this._auth.removeUrl(urlId)
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
