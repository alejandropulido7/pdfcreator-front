import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { loginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { AgreementListComponent } from './components/agreements/agreement-list/agreement-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent    
  },
  {
    path: 'form',
    component: FormComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'agreements',
    component: AgreementListComponent,
    canActivate: [loginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
