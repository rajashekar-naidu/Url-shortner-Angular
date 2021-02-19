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
  allowAuthentication=true;
  emptyForm:boolean;
  successful:boolean;
  duplicateUrl:boolean;
  // passwordFieldEmpty:boolean;

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
    console.log(this.allowAuthentication);
    
  }

  onSubmit(){
    console.log(this.urlForm.value);
   if((this.allowAuthentication === true && this.urlForm.get('password').value ==="") || (this.allowAuthentication === true && this.urlForm.get('password').value===null)) {
      this.emptyForm = true;
   }
    if (this.urlForm.invalid) {
      this.emptyForm=true;
      this.urlForm.reset({});
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
            console.log(this.duplicateUrl);
            
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
