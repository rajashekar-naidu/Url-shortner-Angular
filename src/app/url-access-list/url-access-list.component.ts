import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-url-access-list',
  templateUrl: './url-access-list.component.html',
  //styleUrls: ['./url-access-list.component.scss']
})
export class UrlAccessListComponent implements OnInit {

  constructor(private appService: AppService, private _router:Router) { 
    this.appService.pageTitle = 'URL Access List';
  }

  ngOnInit() {
  }
  return(){
    this._router.navigate(['/url-list']);
  }

}
