import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(
    private http: HttpClient
  ) { }
  get(endpoint: string, isUserToken?: boolean){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token(isUserToken)
      })
    };
    return this.http.get(`${environment.baseUrl}${endpoint}`,httpOptions);
  }
  post(endpoint: string, data,isUserToken?:boolean){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token(isUserToken)
      })
    };
    return this.http.post(`${environment.baseUrl}${endpoint}`,JSON.stringify(data),httpOptions)
  }
  public putRequest(endpoint: string, data: any,isUserToken?:boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token(isUserToken)
      })
    };
    return this.http.put(`${environment.baseUrl}${endpoint}`, JSON.stringify(data), httpOptions);
  }
  public patchRequest(endpoint: string, data: any,isUserToken?:boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token(isUserToken)
      })
    };
    return this.http.patch(`${environment.baseUrl}${endpoint}`, JSON.stringify(data), httpOptions);
  }
  public delRequest(url: string, isUserToken?:boolean) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token(isUserToken)
      })
    };
    return this.http.delete(`${environment.baseUrl}/${url}`, httpOptions);
  }
  private token(isUserToken:boolean) {
    let token = '';
    if(localStorage.getItem('token')) {
      if(localStorage.getItem('drivertoken') && !isUserToken){
        return localStorage.getItem('drivertoken');
      }
      return localStorage.getItem('token');
    }
    return token;
  }
}