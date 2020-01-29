import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
 
public pusher: any;
public url: String = "http://localhost/3000/api/notifications"; 
public channel: any;

  constructor(private http: HttpClient) { 
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('notifications');
  }

  // getNotifications(data){
  //   return this.http.post("http://localhost/3000/api/notifications", data)
  // }
}
