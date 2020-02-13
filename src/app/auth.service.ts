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

  constructor(private http: HttpClient){

  }

    isLoggedIn() {
      let userData = sessionStorage.getItem('userInfo');
      if(userData && JSON.parse(userData)){
        return true;
      }
      return false;
    }

    setUserInfo(user){
      sessionStorage.setItem('userinfo', JSON.stringify(user))
    }

    removeUser(){
      sessionStorage.removeItem('userinfo');
    }


  loginUser(username: string, password: string) {
    let logInfo = {username: username, password: password }
    return this.http.post(`this.baseUrl/login`, logInfo, {headers :this.headers})
    .pipe(tap(data => {
      this.currentUser = <IUser>data['user'];
    }))
    .pipe(catchError(err => {
      return of(false)
    }))
  }

  logOut(){
    this.removeUser();
  }
}
