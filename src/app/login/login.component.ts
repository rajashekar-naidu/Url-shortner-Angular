import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../vendor/styles/pages/authentication.scss']
})
export class LoginComponent implements OnInit{
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  loginForm:FormGroup;
  isSubmitted = false;  
  wrongEmail=false;
  wrongPassword=false;
  constructor(private _appService: AppService, private _auth:AuthService, private _router: Router, private _formBuilder:FormBuilder) {
    this._appService.pageTitle = 'Login';
  }
  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(this.passPattern)]],
    });
  }

  get formControls() { return this.loginForm.controls; }
  
  onLogin() {
    console.log(this.loginForm.value);
    this.isSubmitted=true;
    if (this.loginForm.invalid) {
       return;
    }
    this._auth.loginUser(this.loginForm.value)
    .subscribe(
      res => {
        console.log(res);
       localStorage.setItem('token', res.data.token);
       localStorage.setItem('uId', res.data.userId);
        this._router.navigate(['/shorturl'])
      },
      err => {
        console.log(err);
        if(err.error.message ==="Email incorrect"){
          this.wrongEmail=true;
          this.loginForm.reset({});
        }

        if(err.error.message ==="Password incorrect"){
          this.wrongPassword=true;
          this.loginForm.reset({});
        }

        
      } 
    ) 
  }
  closeEmailAlert(){
    this.wrongEmail=false;
  }
  closePassAlert(){
    this.wrongPassword=false;
  }

  signup(){
    this._router.navigate(['/signup'])
  }
}
