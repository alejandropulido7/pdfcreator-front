import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLogued: User;

  constructor(private http: HttpClient,
    private cookies: CookieService) { }

  login(user: User): Observable<User>{
    const URL = `${environment.BACKEND_URL}/api/auth/login`;
    return this.http.post(URL, user);
  }

  setUserLogued(user: User){
    this.userLogued = user;
  }

  async getUserLogued():Promise<User> {
    const token = this.cookies.get('token');
    const URL = `${environment.BACKEND_URL}/api/auth/validateToken/${token}`;
    if(!this.userLogued) {
    const userfound = await new Promise((resolve, reject) =>{
        this.http.get(URL).subscribe((user:User) => {
          const userLog:User = {
            email: user.email,
            username: user.username
          };
          resolve(userLog);
        }, (error) => {
          reject({})
        }); 
      })    
      this.setUserLogued(userfound)
    };
    return this.userLogued
  }
}
