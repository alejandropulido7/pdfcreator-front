import { HttpHeaders } from "@angular/common/http";

export class Constants {
    public static OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/pdf',
      })
    };
    public static ROLE_ADMIN = 'admin';
    public static ROLE_USER = 'user';
  }

  export const REQUIREMENTS_TYPES = [
    'Web Desing', 'Graphic Desing', 'Web Development', 'Web site', 'E-commerce'
  ];

  export const PRIORITY = ['Urgent', 'High', 'Normal', 'Low']