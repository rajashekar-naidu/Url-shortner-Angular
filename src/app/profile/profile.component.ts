import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  //styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  firstName:string;
  lastName:string;
  emailAddress:string;
  isSubmitted = false; 
  failedToGetDetails:boolean;
  editSuccessFul:boolean;
  editFailure:boolean;
  emailAlreadyRegistered=false; 
  uId:string;
  editProfile=true;
  editForm = new FormGroup({
    fName: new FormControl('',Validators.required),
    lName: new FormControl('',Validators.required),
    email:  new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private _appService:AppService, private _auth:AuthService, private _formBuilder:FormBuilder, private activatedRoute: ActivatedRoute, private _router:Router ) { 
    this._appService.pageTitle = 'Profile';
  }
  

  ngOnInit() {
    if(this._auth.getRole()===false)
      this._router.navigate(['/']);
    this.uId = this.activatedRoute.snapshot.paramMap.get('id'); //or params['id'] insted of paramMap.get('id')
    console.log(this.uId);
      this.getUserDetailsBasedOnId(this.uId); 
  }

get f(){
  return this.editForm.controls;
}

  toggleEdit(){
    this.editProfile = !this.editProfile;
    // route to url shortner page with copied url data and populate and generate it there
  }
  
  setValue(){
    this.editForm.setValue({fName: this.firstName, lName:this.lastName, email:this.emailAddress});
  }

  getUserDetailsBasedOnId(uId){  
    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        this.firstName =data.fName;
        this.lastName =data.lName;
        this.emailAddress =data.email;
        console.log(this.firstName);
        console.log(this.lastName);
        console.log(this.emailAddress);
        this.setValue();
      },
      error => {
        console.log(error);
        this.failedToGetDetails = true;
      });
  }

  onSubmit() {   
    console.log(this.editForm.value);
    this.isSubmitted=true;
    if (this.editForm.invalid) {
       return;
    }
    console.log(this.editForm.value);
    this._auth.updateUser(this.uId,this.editForm.value)
    .subscribe(
        res => {
          console.log(res);
          this.editSuccessFul = true;
        },
        err => {
          console.log(err);
          this.editFailure = true;
        }
  )};

  failedToGetDetailsAlert(){
    this.failedToGetDetails = false;
  }

  editSuccessFulAlert(){
    this.editSuccessFul = false;
  }

  editFailureAlert(){
    this.editFailure = false;
  }

}
