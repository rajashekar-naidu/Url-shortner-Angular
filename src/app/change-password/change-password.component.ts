import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { ConfirmedValidator } from '../_helpers/confirmed.validator';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  //styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  uId:string;
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  passwordForm:FormGroup;
  emptyForm:boolean;
  samePassword:boolean;
  matchError:boolean;
  serverError:boolean;
  sucessfulChange:boolean;

  constructor(private activatedRoute: ActivatedRoute, private _appService: AppService, private _formBuilder:FormBuilder, private _auth:AuthService, private _router:Router) { 
    this._appService.pageTitle = 'Change Password';
  }

  ngOnInit() {
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
  if(this._auth.getRole()===false)
    this._router.navigate(['/']);
    this.passwordForm = this._formBuilder.group({
      Password : ['', [Validators.required, Validators.pattern(this.passPattern)]],
      newPassword : ['', [Validators.required, Validators.pattern(this.passPattern)]],
      confirmPassword : ['', [Validators.required]],
    }, {validator: ConfirmedValidator('newPassword', 'confirmPassword')});
  }


  get formControls() { return this.passwordForm.controls; }

  onSubmit() {    
    if (this.passwordForm.invalid) {
      this.emptyForm=true;
      this.ngOnInit();
      return;
    }
    console.log(this.passwordForm.value);
    this._auth.changePassword(this.passwordForm.value)
    .subscribe(
        res => {
          console.log(res.message);
          if(res.message === "Sucessfully Changed the password")
            this.sucessfulChange=true;
        },
        err => {
          console.log(err);
          if(err.error.message === "Please enter another password your new password matched with old one")
            this.samePassword=true;

          if(err.error.message === "Password do not matched")
            this.matchError=true;

        //  if(err.name === "HttpErrorResponse"){
        //  this.serverError=true;
       // }
        })
    this.passwordForm.reset();
  }

  sucessfulChangeAlert(){
    this.sucessfulChange=false;
  }

  samePasswordAlert(){
    this.samePassword=false;
  }

  matchErrorAlert(){
    this.matchError=false;
  }

  closeEmptyFormAlert(){
    this.emptyForm=false;
  }

  closeServerAlert(){
    this.serverError=false;
  }
}
