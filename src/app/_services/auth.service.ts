import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//check the login and registration authentication service using the url from server side handle it here

@Injectable()
export class AuthService {
  private baseUrl="http://192.168.1.41:5000";
  //user apis
  private _registerUrl = this.baseUrl+"/user/register";//post
  private _loginUrl = this.baseUrl+"/user/login";//post
  private _allUsers = this.baseUrl+"/user/all-user/list";//get
  private _userDetailsByID = this.baseUrl+"/user/user-by-id";//get
  private _updateUserByID = this.baseUrl+"/user/user-update/";//put 
  private _removeUserByID = this.baseUrl+"/user/user-remove";//delete
  
  //url apis
  private _sendLongUrl = this.baseUrl+"/shortUrl/url";//post
  private _allUrls = this.baseUrl+"/shortUrl/all-url";//get
  private _urlByID = this.baseUrl+"/shorturl/modify/code";//put
  private _removeUrl = this.baseUrl+"/shortUrl/remove-url";//delete
  private _urldetails = this.baseUrl+"/shortUrl/get-url/:code";//get ....what code?
  private _redirectToUrl = this.baseUrl+"/shortUrl/redirect-url/:code";//get ....what code?





  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  getAllUsers() {
    return this.http.get<any>(this._allUsers, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });
  }

  getUserDetails(uId){
    return this.http.get<any>(`${this._userDetailsByID}/${uId}`,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })      
    });
  }

  updateUser(uId) {
    return this.http.put<any>(this._updateUserByID, uId)
  }


  removeUser(uId){
    console.log(`${this._removeUserByID}/${uId}`);
    return this.http.delete(`${this._removeUserByID}/${uId}`,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })      
    });
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
  
  getuId(){
    return localStorage.getItem('uId');
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('uId');
    this._router.navigate(['/login']);
  }


  sendLongUrl(longUrl){ 
    return this.http.post<any>(this._sendLongUrl,longUrl, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'authorization': localStorage.getItem('token')
      })
    });
  }


  getAllUrls(){
    return this.http.get<any>(this._allUrls, {
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })
    });
  }



  removeUrl(urlId){
    console.log(`${this._removeUrl}/${urlId}`);
    return this.http.delete(`${this._removeUrl}/${urlId}`,{
      headers:new HttpHeaders({
        'Content-type':'application/json',
        'authorization':localStorage.getItem('token')
      })      
    });
  }

}