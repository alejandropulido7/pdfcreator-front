import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ServiceAgreement } from '../models/serviceAgreement';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  headers: HttpHeaders = new HttpHeaders({token: this.cookies.get('token')});

  constructor(private readonly http: HttpClient,
    private cookies: CookieService) {    
     }

  saveAgreement(serviceAgreement: ServiceAgreement): Observable<any>{
    const URL = `${environment.BACKEND_URL}/api/agreement`;
    return this.http.post(URL, serviceAgreement);
  }

  findAllAgreements(): Observable<ServiceAgreement[]>{
    const URL = `${environment.BACKEND_URL}/api/agreement`;
    return this.http.get<ServiceAgreement[]>(URL, {headers: this.headers});
  }

  sentEmail(id: string, address: string): Observable<any> {
    const URL = `${environment.BACKEND_URL}/api/email`;
    const body = {
      idAgreement: id,
      sendTo: address
    }
    return this.http.post(URL, body);
  }
}
