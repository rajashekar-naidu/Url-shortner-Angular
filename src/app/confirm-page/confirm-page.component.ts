import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styles: ['./confirm-page.component.css'],
  
})
export class ConfirmPageComponent {
  constructor(private _appService: AppService, private _router:Router) { 
    this._appService.pageTitle = 'confirm page';
  }

  submit(){
    this._router.navigate(['/user-accounts']);
  }
}
