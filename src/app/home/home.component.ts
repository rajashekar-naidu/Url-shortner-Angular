import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  urlPattern='(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  urlForm:FormGroup;
  allowAuthentication:boolean=false;
  isSubmitted = false; 

  constructor(private appService: AppService, private _formBuilder:FormBuilder, private _auth:AuthService) {
    this.appService.pageTitle = 'URL Shortner';
  }

  ngOnInit() {
    this.urlForm = this._formBuilder.group({
      longUrl : ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      password : [''],
    });
  }

  get formControls() { return this.urlForm.controls; }

  onAuthentication(){
    this.allowAuthentication = !this.allowAuthentication;
  }
  onSubmit(){
    this.isSubmitted=true;
    console.log(this.urlForm.value);
    if (this.urlForm.invalid) {
       return;
    }
    this._auth.sendLongUrl(this.urlForm.value)
    .subscribe(
        res => {
          console.log(res);

        },
        err => {
          console.log(err);
        }

      )
    this.urlForm.reset();
  }
}
