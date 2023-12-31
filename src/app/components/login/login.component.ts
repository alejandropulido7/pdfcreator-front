import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ModalErrorComponent } from '../utils/modal-error/modal-error.component';
import { Router } from '@angular/router';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private router: Router){}

  btnRole!: string;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    btnRole: new FormControl('user')
  });


  onSubmit(){
    const login: User = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(login).subscribe((res) => {
      this.cookieService.set('token', res.token);
      this.cookieService.set('user', res.role);
      this.authService.setUserLogued(res);
      const role = this.loginForm.controls['btnRole'].value;
      if( res.role == Constants.ROLE_ADMIN){
        const path = role == Constants.ROLE_ADMIN ? 'agreements' : 'form';
        
        this.router.navigate([path]);
      }
      if( res.role == Constants.ROLE_USER){
        if(role == Constants.ROLE_ADMIN){
          this.dialog.open(ModalErrorComponent, {
            data: {message: 'User not authorized'}
          });  
        };
        this.router.navigate(['form']);
      }
      
    }, (error) => {
      this.dialog.open(ModalErrorComponent, {
        data: {
          title: 'Error',
          message: 'Service not available'
        }
      });      
    });

    
  }

  getCookie() {
    const cookie = this.cookieService.get('token');
  }
}
