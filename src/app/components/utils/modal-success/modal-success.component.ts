import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AgreementService } from 'src/app/services/agreement.service';
import { ModalErrorComponent } from '../modal-error/modal-error.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalLoadingComponent } from '../modal-loading/modal-loading.component';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent {
  
  _enableEmail:boolean = false;
  emailCustomer:string;
  dialogRef: MatDialogRef<ModalErrorComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private serviceAgreement: AgreementService,
  private dialog: MatDialog, 
  private router: Router,
  private activateRoute: ActivatedRoute,
  private dialogRefCurrent: MatDialogRef<ModalSuccessComponent>,
  private dialogRefInfo: MatDialogRef<ModalErrorComponent>){}

  enableEmail(email:string){
    this._enableEmail = true;
    this.emailCustomer = email;
  }

  sentEmail(id: string){
    console.log(id);
    console.log(this.emailCustomer);
    this.dialogRefCurrent.close();
    let loading = this.dialog.open(ModalLoadingComponent, {
      width: '200px',
      height: '200px'
    });
    this.serviceAgreement.sentEmail(id, this.emailCustomer).subscribe((response) => {
      loading.close();
      console.log(response);
      let dialogRef = this.dialog.open(ModalErrorComponent, {
        data: {
          title: 'Done!',
          message: response.message
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log("MODAL ERROR CERRADO");
        this.router.navigate(['agreements']);
      });
    }, (error) => {
      console.log(error);
    });

    
    
  }
}
