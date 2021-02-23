import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router:Router, 
        private _auth:AuthService
        ){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this._auth.getToken();       
        if (token === null) {
            return true;
        }else {
            this._router.navigate(['/dashboard']);
            return false;
        }
    }

   
}