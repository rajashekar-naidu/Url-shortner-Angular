import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-url-access-list',
  templateUrl: './url-access-list.component.html',
  //styleUrls: ['./url-access-list.component.scss']
})
export class UrlAccessListComponent implements OnInit {
  urlDetails:any;
  urlTrackerDetails:any;
  urlId:string;
  noUrlId:boolean;
  longUrl;
  shortUrl;
  user_id;
  createdAt;
  clicks; 
  url_id; 
  noUrlDetailsFromServer:boolean;

  constructor(private appService: AppService, private _router:Router, private _auth:AuthService, private activatedRoute:ActivatedRoute) { 
    this.appService.pageTitle = 'URL Access List';
  }

  ngOnInit() {
    if(this._auth.getRole()===false)
      this._router.navigate(['/']);
    this.urlId = this.activatedRoute.snapshot.paramMap.get('urlId'); //or params['id'] insted of paramMap.get('id')
    console.log(this.urlId);
    this.getUrlTrackerDetailsbyId(this.urlId);
  }

  getUrlTrackerDetailsbyId(urlId){
    if(urlId === null){
      this.noUrlId ==true;
      return;
    }
    console.log(urlId);
    this._auth.getUrlDetails(urlId)
    .subscribe(
      data => {
        console.log(data);
        this.urlDetails = data || [];
        this.longUrl =this.urlDetails.longUrl;
        this.shortUrl =this.urlDetails.shortUrl;
        this.user_id = this.urlDetails.user_id;
        this.createdAt = this.urlDetails.createdAt;
        this.clicks = this.urlDetails.clicks;
        this.url_id = this.urlDetails._id;
        this.urlTrackerDetails = data.url_tracker || [];
      },
      error => {
        console.log(error);
        this.noUrlDetailsFromServer=true;
    });
  }

  return(){
    this._router.navigate(['/shorturl/short-url-list']);
  }

  noUrlDetailsFromServerAlert(){
    this.noUrlDetailsFromServer=false;
  }

  noUrlIdAlert(){
    this.noUrlId=false;
  }
}
