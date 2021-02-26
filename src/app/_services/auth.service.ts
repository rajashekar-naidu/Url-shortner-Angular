import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//check the login and registration authentication service using the url from server side handle it here

@Injectable()
export class AuthService {
  //private baseUrl="http://localhost:5000";
  private baseUrl="http://192.168.1.90:5000";
  //user apiss
  private _registerUrl = this.baseUrl+"/user/register";//post
  private _loginUrl = this.baseUrl+"/user/login";//post
  private _googleAuth = this.baseUrl+"/user/google"//get 
  private _allUsers = this.baseUrl+"/user/all-user/list";//get
  private _userDetailsByID = this.baseUrl+"/user/user-by-id";//get  /:userId
  private _updateUserByID = this.baseUrl+"/user/user-update";//put  // /:userId
  private _removeUserByID = this.baseUrl+"/user/user-remove";//delete
  //private _getAllLogs = this.baseUrl+/user/get-all-log;//get
  private _getLogsByID = this.baseUrl+"/user/get-log";//get
  private _logoutByID = this.baseUrl+"/user/logout"; //get
  private _changePassword = this.baseUrl+"/user/update-password"; //post
  private _dashboard = this.baseUrl+"/user/dashboard"; //get

  
  
  //url apis
  private _sendLongUrl = this.baseUrl+"/shortUrl/url";//post
  private _allUrls = this.baseUrl+"/shortUrl/all-url";//get
 // private _urlByID = this.baseUrl+"/shortUrl/modify";//put 
  private _removeUrl = this.baseUrl+"/shortUrl/remove-url";//delete //UrlID
  private _urldetails = this.baseUrl+"/shortUrl/get-url";//get //urlID
  private _redirectToUrl = this.baseUrl+"/shortUrl/redirect-url/:code";//get


  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  loginUser(user) {
    console.log(user);
    return this.http.post<any>(this._loginUrl, user)
  }

  googleOAth(){
    return this.http.get<any>(this._googleAuth, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
      }
      );
  }

  getDashboard(){
     return this.http.get<any>(this._dashboard)//, {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json',
    //     'authorization': localStorage.getItem('token')
    //   })
    // });
  }

  getAllUsers() {
     return this.http.get<any>(this._allUsers)//, {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json',
    //     'authorization': localStorage.getItem('token')
    //   })
    // });
  }

  getUserDetails(uId){
    console.log(uId);
    return this.http.get<any>(`${this._userDetailsByID}/${uId}`)/*,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })      
    });*/
  }
  
  updateUser(uId,user) { //check if its working properly
    return this.http.put<any>(`${this._updateUserByID}/${uId}`, user) /*, {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })
    });*/
  }


  removeUser(uId){
    return this.http.delete(`${this._removeUserByID}/${uId}`)/*,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })      
    });*/
  }

  changePassword(password) {
    return this.http.post<any>(this._changePassword, password) /*, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });*/
  }

  logoutUser(){  
    return this.http.get<any>(this._logoutByID) /*, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    }); */
  }

  userLogsByID(uId){
    return this.http.get<any>(`${this._getLogsByID}/${uId}`) /*,{
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });*/
  }

  isAuthenticated(){
    return localStorage.getItem('token') 
  }

  getToken() { //check if this is needed
    return   localStorage.getItem('token')
  }
  
  getuId(){ //check if this is needed
    return localStorage.getItem('uId');
  }

  getRole(){ //check if this is needed
    if(localStorage.getItem('role') === "Admin")
      return "Admin";
    if(localStorage.getItem('role') === "User")
      return "User";
    else
    return false;
  }

  sendLongUrl(longUrl){    
    return this.http.post<any>(this._sendLongUrl,longUrl) /*, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });*/
  }


  getAllUrls(){
    return this.http.get<any>(this._allUrls) /*, {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })
    });*/
  }

  // modifyUrlDetails(urlId,longUrl){ //not needed
  //   console.log(urlId);
  //   console.log(longUrl);
  //   return this.http.put<any>(`${this._urlByID}/${urlId}`, longUrl, {
  //     headers:new HttpHeaders({
  //       'Content-type':'application/json',
  //       'authorization':localStorage.getItem('token')
  //     })
  //   });
  // }

  getUrlDetails(urlId){
    console.log(urlId);
    
    return this.http.get<any>(`${this._urldetails}/${urlId}`) /*, {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })
    }); */
  }

  removeUrl(urlId){
    return this.http.delete(`${this._removeUrl}/${urlId}`) /*,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })      
    });*/
  }

}