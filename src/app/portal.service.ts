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
  // baseUrl = 'http://localhost:3000/api' 
  baseUrl = '/api' 
  public headers = {headers: new HttpHeaders().set('Content-Type', 'application/json')}
  // public headers = {responseType: 'text' as 'json', withCredentials: true};
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
    return this.http.get(`${this.baseUrl}/candidates-list`, this.headers);
   }
   dashCandidates(){
    return this.http.get(`${this.baseUrl}/candidates-dash`, this.headers);
   }
   getCandidate(id): Observable<any>{
    return this.http.get(`${this.baseUrl}/candidate/${id}`, this.headers)
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
      return this.http.post<any>(url, data, this.headers)
      .pipe(catchError(this.errorMgmt)
      )
   }

   updateCandidate(id, data){
     let url = `${this.baseUrl}/update/${id}`;
    return this.http.put(url, data, this.headers)
   }

   deleteCandidate(id): Observable<any>{
    let url = `${this.baseUrl}/delete-candidate/${id}`
    return this.http.delete(url, this.headers)
    .pipe(
      catchError(this.errorMgmt)
    )
   }

   getAccessor(id, accessorId){
    let url = `${this.baseUrl}/get-accessor/${id}?accessorId=${accessorId}`;
    return this.http.get(url,this.headers).pipe(catchError(this.errorMgmt))
   }

   verifyInvite(id, accessorId): Observable<any>{
     let url = `${this.baseUrl}/verify-invite/${id}?accessorId=${accessorId}`;
     return this.http.put(url, this.headers).pipe(catchError(this.errorMgmt));
   }
   sendPapers(id, accessorId): Observable<any>{
    let url = `${this.baseUrl}/send-papers/${id}?accessorId=${accessorId}`;
    return this.http.put(url, this.headers).pipe(catchError(this.errorMgmt));
  }

   verifyPapers(id, accessorId): Observable<any>{
    let url = `${this.baseUrl}/verify-papers/${id}?accessorId=${accessorId}`;
    return this.http.put(url, this.headers).pipe(catchError(this.errorMgmt));
   }
   returnPapers(id, accessorId): Observable<any>{
    let url = `${this.baseUrl}/return-publication/${id}?accessorId=${accessorId}`;
    return this.http.put(url, this.headers).pipe(catchError(this.errorMgmt));
   }
   notifications(){
    return this.http.get(`${this.baseUrl}/notifications`, this.headers);
   }
   notificationsDash(){
    return this.http.get(`${this.baseUrl}/notifications-dash`, this.headers);
   }
   getFaculties(){
    return this.http.get(`${this.baseUrl}/departments`, this.headers);
   }
   addDepartment(id, data): Observable<any>{
    let url = `${this.baseUrl}/add-department/${id}`;
    return this.http.put(url, data, this.headers).pipe(catchError(this.errorMgmt));
   }
   removeDepartment(id, departmentId): Observable<any>{
    let url = `${this.baseUrl}/remove-department/${id}?dep_id=${departmentId}`;
    return this.http.put(url, this.headers).pipe(catchError(this.errorMgmt));
   }
   finalStatus(id, accessorId, status):Observable<any>{
    let url = `${this.baseUrl}/final-status/${id}?accessorId=${accessorId}&status=${status}`;
    return this.http.put(url, this.headers).pipe(catchError(this.errorMgmt));
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
