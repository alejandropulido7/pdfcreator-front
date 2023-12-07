import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequirementComponent } from './components/requirement/requirement.component';
import { HttpClientModule } from '@angular/common/http';
import { SignatureComponent } from './components/signature/signature.component';
import { LoginComponent } from './components/login/login.component';
import { AgreementListComponent } from './components/agreements/agreement-list/agreement-list.component';
import { AgreementComponent } from './components/agreements/agreement/agreement.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalErrorComponent } from './components/utils/modal-error/modal-error.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { ModalSuccessComponent } from './components/utils/modal-success/modal-success.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    RequirementComponent,
    SignatureComponent,
    AgreementListComponent,
    AgreementComponent,
    ModalErrorComponent,
    ModalSuccessComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [
    CookieService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
