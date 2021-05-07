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
  get(endpoint: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': (localStorage.getItem('token') ? localStorage.getItem('token') : '')
      })
    };
    return this.http.get(`${environment.baseUrl}${endpoint}`,httpOptions);
  }
  post(endpoint: string, data){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': (localStorage.getItem('token') ? localStorage.getItem('token') : '')
      })
    };
    return this.http.post(`${environment.baseUrl}${endpoint}`,JSON.stringify(data),httpOptions)
  }
  public putRequest(endpoint: string, data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': (localStorage.getItem('token') ? localStorage.getItem('token') : '')
      })
    };
    return this.http.put(`${environment.baseUrl}${endpoint}`, JSON.stringify(data), httpOptions);
  }
  public delRequest(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': (localStorage.getItem('token') ? localStorage.getItem('token') : '')
      })
    };
    return this.http.delete(`${environment.baseUrl}/${url}`, httpOptions);
  }
}
