import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { ServiceAgreement } from '../models/serviceAgreement';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  constructor(private readonly http: HttpClient) { }

  sendAndGeneratePdf(serviceAgreement: ServiceAgreement): Observable<any>{
    const URL = `${environment.BACKEND_URL}/api/pdf`;
    return this.http.post(URL, serviceAgreement, {responseType: "blob"});
  }
}
