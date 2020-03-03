import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { IUser } from 'src/app/user.model';


@Injectable()

export class AuthGuard implements CanActivate {
    UserId: IUser;
    constructor(private auth: AuthService, private router: Router) {

    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    //  return this.checkLoggedIn();
    return true;
   }
 
   checkLoggedIn() {
       if(this.auth.isLoggedIn()){
        return true;
       }
       else{
        this.router.navigate(['/'])
        return false;
       }
   }
}