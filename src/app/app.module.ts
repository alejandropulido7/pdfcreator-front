import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequirementComponent } from './components/requirement/requirement.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { SignatureComponent } from './components/signature/signature.component';
import { LoginComponent } from './components/login/login.component';
import { AgreementListComponent } from './components/agreements/agreement-list/agreement-list.component';
import { AgreementComponent } from './components/agreements/agreement/agreement.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    RequirementComponent,
    SignatureComponent,
    AgreementListComponent,
    AgreementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
