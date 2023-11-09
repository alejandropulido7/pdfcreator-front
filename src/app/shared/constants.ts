import { HttpHeaders } from "@angular/common/http";

export class Constants {
    public static RAMO_VIDA_GRUPO = '083';
    public static OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
      })
    };
    public static ROLE_ADMIN = 'admin';
    public static ROLE_USER = 'user';
  }