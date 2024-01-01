import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceAgreement } from 'src/app/models/serviceAgreement';
import { AgreementService } from 'src/app/services/agreement.service';
import { ModalErrorComponent } from '../../utils/modal-error/modal-error.component';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent {

  @Input() agreement: ServiceAgreement;
  activeRequirement: boolean = false;
  textButtonRequirements: string = 'Show requirements';
  activateEmail:boolean = false;
  emailCustomer:string = '';
  alert:object = {
    title:'',
    sendMail:'',
    colorAlert:''
  }
  

  constructor(private serviceAgreement: AgreementService,
    private dialog:MatDialog){}

  showRequirements(){
    this.activeRequirement = !this.activeRequirement;
    this.textButtonRequirements = this.activeRequirement ? 'Hide requirements' : 'Show requirements';
  }

  mailActive(email:string){
    this.activateEmail = true;
    this.emailCustomer = email;

  }

  sentEmail(id:string){
    this.serviceAgreement.renderLoading(true);
    this.serviceAgreement.sentEmail(id, this.emailCustomer).subscribe((response) => {
      this.serviceAgreement.renderLoading(false);
      this.activateEmail = false;
      this.alert = {
        title: 'Success!',
        sendMail: response.message,
        colorAlert: 'bg-green-100'
      }
    }, (error) => {
      this.alert = {
        title: 'Error!',
        sendMail: error,
        colorAlert: 'bg-tes-100'
      }
    });
  }

  downloadPdf(id: string){
    this.serviceAgreement.renderLoading(true);
    this.serviceAgreement.downloadPdf(id).subscribe((pdf) => {
      this.serviceAgreement.renderLoading(false);
      try {
        this.alert = {
          title: 'Success!',
          sendMail: 'The PDF has been opened to other tab',
          colorAlert: 'bg-green-100'
        };
        const url = window.URL.createObjectURL(pdf);
        window.open(url, '_blank');
      } catch (e) {
        this.alert = {
          title: 'Error!',
          sendMail: e,
          colorAlert: 'bg-tes-100'
        }
      }
    })
  }

  clearAlert(){
    this.alert = {
      title: '',
      sendMail: '',
      colorAlert: ''
    }
  }

}
