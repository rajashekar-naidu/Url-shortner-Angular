import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  urlPattern='(https?:\/\/)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*\/?';
  urlForm:FormGroup;
  allowAuthentication=true;
  emptyForm:boolean;
  successful:boolean;
  duplicateUrl:boolean;
  // passwordFieldEmpty:boolean;

  constructor(private appService: AppService, private _formBuilder:FormBuilder, private _auth:AuthService, private _router:Router) {
    this.appService.pageTitle = 'URL Shortner';
  }

  ngOnInit() {
    if(this._auth.getRole()===false)
      this._router.navigate(['/']);
    this.urlForm = this._formBuilder.group({
      longUrl : ['', [Validators.required, Validators.pattern(this.urlPattern)]],
      password : [''],
    });
  }

  get formControls() { return this.urlForm.controls; }

  onAuthentication(){
    this.allowAuthentication = !this.allowAuthentication;
    console.log(this.allowAuthentication);
    
  }

  onSubmit(){
    console.log(this.urlForm.value);
   // console.log(this.allowAuthentication);
   if((this.allowAuthentication === true && this.urlForm.get('password').value ==="") || (this.allowAuthentication === true && this.urlForm.get('password').value===null)) {
      this.emptyForm = true;
      console.log(this.allowAuthentication);
      this.ngOnInit();
    // this.urlForm.reset({});
      return;
   }

   if((this.allowAuthentication === true && this.urlForm.get('longUrl').value ==="") || (this.allowAuthentication === true && this.urlForm.get('longUrl').value===null)) {
    this.emptyForm = true;
    console.log(this.allowAuthentication);
    this.ngOnInit();
  // this.urlForm.reset({});
    return;
 }

   if((this.allowAuthentication === false && this.urlForm.get('longUrl').value ==="") || (this.allowAuthentication === false && this.urlForm.get('longUrl').value===null)) {
    this.emptyForm = true;
    console.log(this.allowAuthentication);
    this.ngOnInit();
   // this.urlForm.reset({});
    return;
 }
    
    console.log(this.urlForm.value);  
      this._auth.sendLongUrl(this.urlForm.value)
      .subscribe(
          res => {
            this.successful=true;
            console.log(res);
            this.ngOnInit();

          },
          err => {
            console.log(err.error);            
            if(err.error.message == " longUrl already exists "){
              this.duplicateUrl=true;
              this.ngOnInit();
            }
      });
    this.urlForm.reset();
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
    this.ngOnInit();
  }

  closeSuccessAlert(){
    this.successful=false;
    this.ngOnInit();
  }

  closeDuplicateUrlAlert(){
    this.duplicateUrl=false;
    this.ngOnInit();
  }

}
