import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private _appService: AppService, private _formBuilder:FormBuilder, private _auth:AuthService) { 
    this._appService.pageTitle = 'Change Password';
  }

  ngOnInit() {
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
    this.passwordForm = this._formBuilder.group({
      oldPassword : ['', [Validators.required, Validators.pattern(this.passPattern)]],
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
    this._auth.registerUser(this.passwordForm.value)
    .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        //  if(err.error.errors.email === "that email is already registered")
        //    this.emailAlreadyRegistered=true;
        })
    this.passwordForm.reset();
  }

}
