import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
 // styleUrls: ['../../vendor/styles/pages/authentication.scss']
})
export class SignupComponent implements OnInit {
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  signupForm:FormGroup;
  emptyForm:boolean;
  serverError:boolean;
  emailAlreadyRegistered=false; 

  constructor(private _appService: AppService, private _auth:AuthService, private _router: Router, private _formBuilder:FormBuilder) {
    this._appService.pageTitle = 'Add User';
   }
   roles: any = ['Admin', 'User'];
  ngOnInit() {
    this.signupForm = this._formBuilder.group({
      fName:['',Validators.required],
      lName:['',Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(this.passPattern)]],
      role:['',Validators.required],
    });
  }

  get formControls() { return this.signupForm.controls; }

  onSubmit() {    
    if (this.signupForm.invalid) {
      this.emptyForm=true;
      this.ngOnInit();
      return;
    }
    console.log(this.signupForm.value);
    this._auth.registerUser(this.signupForm.value)
    .subscribe(
        res => {
          console.log(res);
          this._router.navigate(['/confirm-page']);
        },
        err => {
          console.log(err.error.errors.email);
          if(err.error.errors.email === "that email is already registered")
            this.emailAlreadyRegistered=true;

          if(err.name === "HttpErrorResponse")
            this.serverError=true;

        })
    this.signupForm.reset();
 }
 login(){
  this._router.navigate(['/login'])
}

closeEmptyFormAlert(){
  this.emptyForm=false;
}

closeAlert(){
  this.emailAlreadyRegistered=false;
}

closeServerAlert(){
  this.serverError=false;
}

}
