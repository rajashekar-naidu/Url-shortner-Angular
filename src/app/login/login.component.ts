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
  wrongCredentials=false;
  emptyForm:boolean;
  serverError:boolean;
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
    if (this.loginForm.invalid) {
      this.emptyForm=true;
     // this.loginForm.reset({});
      return;
    }
    console.log(this.loginForm.value);
    this._auth.loginUser(this.loginForm.value)
    .subscribe(
      res => {
        console.log(res);
       localStorage.setItem('token', res.data.token);
       localStorage.setItem('uId', res.data.userId);
       localStorage.setItem('role',res.data.role);
        this._router.navigate(['/dashboard'])
      },
      err => {
        console.log(err.message);
        console.log(err);
        if(err.error.message ==="Email incorrect"){
          this.wrongCredentials=true;
        //  this.loginForm.reset({});
        }

        if(err.error.message ==="Password incorrect"){
          this.wrongCredentials=true;
        //  this.loginForm.reset({});
        }
        
       if(err.message === "Http failure response for http://192.168.1.41:5000/user/login: 0 Unknown Error")
         this.serverError=true;
      } 
    )}
    
  closeCredentialsAlert(){
    this.wrongCredentials=false;
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
  }

  closeServerAlert(){
    this.serverError=false;
  }


}
