import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ModalErrorComponent } from "../components/utils/modal-error/modal-error.component";


export const loginGuard = () => {
    const router = inject(Router);
    const cookie = inject(CookieService);
    if(cookie.get("token") == ''){
        router.navigate(['/']);
    }    
    return true
}

export const adminRoute = () => {
    // const router = inject(Router);
    const cookie = inject(CookieService);
    const dialog = inject(MatDialog);
    if(cookie.get("role") == 'user'){
        dialog.open(ModalErrorComponent, {data: {
            errorMessage: 'Not authorized'
        }})
        return false;
    }    
    return true
}