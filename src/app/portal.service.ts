import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { environment } from '../environments/environment';
declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  baseUrl = 'http://localhost:3000/api' 
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  public pusher: any;
  public channel: any

  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('notifications');
   }
   
   getCandidates(){
    return this.http.get(`${this.baseUrl}/candidates-list`);
   }
   dashCandidates(){
    return this.http.get(`${this.baseUrl}/candidates-dash`);
   }
   getCandidate(id): Observable<any>{
    return this.http.get(`${this.baseUrl}/candidate/${id}`, {headers: this.headers})
    .pipe(map((res)=> {
      return res;
    }),
      catchError(this.errorMgmt)
      )
   }
   addCandidate(data) :Observable<any>{
    //  const httpOptions = {
    //    headers: new HttpHeaders({
    //      'Authorization': '',
    //      'Content-Type': 'application/json'
    //    })
    //  }
     let url = `${this.baseUrl}/add-candidate`;
      return this.http.post<any>(url, data)
      .pipe(catchError(this.errorMgmt)
      )
   }

   updateCandidate(id, data){
     let url = `${this.baseUrl}/update/${id}`;
    return this.http.put(url, data, {headers: this.headers})
   }

   deleteCandidate(id): Observable<any>{
    let url = `${this.baseUrl}/delete-candidate/${id}`
    return this.http.delete(url, {headers: this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
   }

   getAccessor(id, accessorId){
    let url = `${this.baseUrl}/get-accessor/${id}?accessorId=${accessorId}`;
    return this.http.get(url,{headers:this.headers}).pipe(catchError(this.errorMgmt))
   }

   verifyInvite(id, accessorId): Observable<any>{
     let url = `${this.baseUrl}/verify-invite/${id}?accessorId=${accessorId}`;
     return this.http.put(url, {headers:this.headers}).pipe(catchError(this.errorMgmt));
   }


   sendPapers(id, accessorId): Observable<any>{
    let url = `${this.baseUrl}/send-papers/${id}?accessorId=${accessorId}`;
    return this.http.put(url, {headers:this.headers}).pipe(catchError(this.errorMgmt));
  }

   verifyPapers(id, accessorId): Observable<any>{
    let url = `${this.baseUrl}/verify-papers/${id}?accessorId=${accessorId}`;
    return this.http.put(url, {headers:this.headers}).pipe(catchError(this.errorMgmt));
   }
   notifications(){
    return this.http.get(`${this.baseUrl}/notifications`);
   }

   notificationsDash(){
    return this.http.get(`${this.baseUrl}/notifications-dash`);
   }

   finalStatus(id, accessorId, status):Observable<any>{
    let url = `${this.baseUrl}/final-status/${id}?accessorId=${accessorId}&status=${status}`;
    return this.http.put(url, {headers:this.headers}).pipe(catchError(this.errorMgmt));
   }
   
   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
