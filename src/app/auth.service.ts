import { Injectable } from '@angular/core';
import { IUser} from './user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:3000/users'
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: IUser;

constructor(private http : HttpClient){

}

 isLoggedIn(): boolean{
    let userData = sessionStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  setUserInfo(user){
    sessionStorage.setItem('userInfo', JSON.stringify(user))
  }

  removeUserInfo(){
    sessionStorage.removeItem('userInfo')
  }

  loginUser(username: string, password: string) {
   let logInfo = {username: username, password: password }
   return this.http.post(`${this.baseUrl}/login`, logInfo, {headers: this.headers})
   .pipe(tap(data=> {
    this.currentUser = <IUser>data['user'];
   }))
   .pipe(catchError(err => {
     return of(false)
   }))
  }

  checkAuthenticationStatus(id:IUser): any{
  return this.http.get(`${this.baseUrl}/login/${id}`, {headers: this.headers})
    .pipe(tap(data => {
      if(data instanceof Object){
        this.currentUser = <IUser>data;
      }
    }))
  }

  logOut(){
    this.removeUserInfo();
  }

}
