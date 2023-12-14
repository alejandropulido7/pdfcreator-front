import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient, HttpContext, HttpContextToken, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ServiceAgreement } from '../models/serviceAgreement';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalLoadingComponent } from '../components/utils/modal-loading/modal-loading.component';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  headers: HttpHeaders = new HttpHeaders({token: this.cookies.get('token')});
  loading: MatDialogRef<ModalLoadingComponent>

  constructor(private readonly http: HttpClient,
    private cookies: CookieService,
    private dialog: MatDialog) {}

  renderLoading(active: boolean){
    if(active){
      this.loading = this.dialog.open(ModalLoadingComponent, {
        width: '200px',
        height: '200px'
      });
    }else {
      this.loading.close();
    }
  }

  saveAgreement(serviceAgreement: ServiceAgreement): Observable<any>{
    const URL = `${environment.BACKEND_URL}/api/agreement`;
    return this.http.post(URL, serviceAgreement, {headers: this.headers});
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
    return this.http.post(URL, body, {headers: this.headers});
  }

  downloadPdf(id: string): Observable<any>{
    const URL = `${environment.BACKEND_URL}/api/pdf`;
    const body = {id}
    return this.http.post(URL, body, {headers:this.headers, responseType: "blob"});
  }
}
