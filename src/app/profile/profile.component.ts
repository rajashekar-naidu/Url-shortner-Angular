import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  passPattern="^(?=[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[A-Z])[A-Za-z0-9]{6,30}$";
  editForm:FormGroup;
  isSubmitted = false; 
  emailAlreadyRegistered=false; 

  editProfile=true;
  fName:string;
  lName:string;
  uId =this._auth.getuId();
  email:string;
  password:string;

  constructor(private _auth:AuthService, private _formBuilder:FormBuilder) { }

  ngOnInit() {
    this.getUserDetailsBasedOnId(this._auth.getuId());
    this.editForm = this._formBuilder.group({
      fName:['',Validators.required],
      lName:['',Validators.required],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(this.passPattern)]],  
    });
  }

  toggleEdit(){
    this.editProfile = !this.editProfile;
    // route to url shortner page with copied url data and populate and generate it there
  }
  

  getUserDetailsBasedOnId(uId){
    this._auth.getUserDetails(uId)
    .subscribe(
      data => {
        this.fName =data.fName;
        this.lName =data.lName;
        this.email =data.email;
        this.password =data.password;
      },
      error => {
        console.log(error);
      });
  }

  onSubmit() {    
    this.isSubmitted=true;
    if (this.editForm.invalid) {
       return;
    }
    console.log(this.editForm.value);
    this._auth.updateUser(this.editForm.value)
    .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err.error.errors.email);
          if(err.error.errors.email === "that email is already registered")
            this.emailAlreadyRegistered=true;
        }
  )};

}
