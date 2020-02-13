import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  mouseoverLogin;
  InvalidLogin: boolean = false;

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit() {
 
  }
  
  Login(formValue){
    this.auth.loginUser(formValue.username, formValue.password).subscribe(resp => {
      if(!resp){
        this.InvalidLogin = true;
      }else{
        this.auth.setUserInfo({ user: resp['user']})
        this.router.navigate(['dashboard']);
      }

    })
    this.router.navigate(['dashboard']);
  }

}
