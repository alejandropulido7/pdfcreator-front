import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentRoute: string;
  constructor(
    private router: Router,
    private cookies: CookieService
    ) {
    this.currentRoute = "Demo";
    this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            this.currentRoute = event.url;
        }
    });
  }

  logout(){
    this.cookies.delete('token');
    this.router.navigate(['/']);
  }
}
