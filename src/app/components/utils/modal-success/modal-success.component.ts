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
    this.dialogRefCurrent.close();
    this.serviceAgreement.renderLoading(true);
    this.serviceAgreement.sentEmail(id, this.emailCustomer).subscribe((response) => {
      this.serviceAgreement.renderLoading(false);
      console.log(response);
      let dialogRef = this.dialog.open(ModalErrorComponent, {
        data: {
          title: 'Done!',
          message: response.message
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['agreements']);
      });
    }, (error) => {
      console.log(error);
    });
  }

  downloadPdf(id: string){
    this.dialogRefCurrent.close();
    this.serviceAgreement.renderLoading(true);
    this.serviceAgreement.downloadPdf(id).subscribe((pdf) => {
      console.log(pdf);
      this.serviceAgreement.renderLoading(false);
      try {
        this.router.navigate(['agreements']);
        const url = window.URL.createObjectURL(pdf);
        window.open(url, '_blank');
      } catch (e) {
        console.error('BlobToSaveAs error', e);
        let dialogRef = this.dialog.open(ModalErrorComponent, {
          data: {
            title: 'Error',
            message: 'Dont able to generate PDF. Try again at view of requirements'
          }
        });
        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['agreements']);
        });
      }
    })
  }
}
