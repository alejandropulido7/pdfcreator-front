import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Requirement } from 'src/app/models/requirement';
import { ServiceAgreement } from 'src/app/models/serviceAgreement';
import { AgreementService } from 'src/app/services/agreement.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{
  requirements: Requirement[] = [];
  addRequirementError:string = '';
  signImage!: string;

  requirementsForm = new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerEmail: new FormControl(''),
    customerPhone: new FormControl(''),
    customerLocation: new FormControl('')
  });
  
  constructor(private agreementService: AgreementService, cookie: CookieService) {  
    this.requirements.push({
      index: 0,
      name: '',
      description: '',
      priority: '',
      buttonRemove: false
    });

    console.log(cookie.get('token'));
  }

  updateRequirement(requirement: Requirement){
    console.log(requirement.index);
    this.requirements[requirement.index].name = requirement.name;
    this.requirements[requirement.index].description = requirement.description;
    this.requirements[requirement.index].priority = requirement.priority;
    console.log(this.requirements);
  }

  addRequirement(){
    this.addRequirementError = '';
    if(this.validateFieldsRequirement()){
      this.requirements.push({
        index: this.requirements.length,
        name: '',
        description: '',
        priority: '',
        buttonRemove: true
      });
    } else {
      this.addRequirementError='Fill the last requirement before add new requirement';
    }   
  }

  removeRequirement(requirement: Requirement){
    const newArrayRequirements = this.requirements.filter(req => req.index!=requirement.index);
    newArrayRequirements.map((req, i) => req.index=i);
    this.requirements = newArrayRequirements;
    console.log(this.requirements)
  }

  validateFieldsRequirement(): boolean{
    const requirement = this.requirements[this.requirements.length-1];
    if(requirement.name == "" &&
    requirement.description == "" &&
    requirement.priority == "" ){
      return false;
    }
    return true;
  }

  loadImage(image: string){
   this.signImage = image;
  }

  getImg(event: Event){
    console.log(event);
  }

  onSubmit():void{
    console.log(this.requirementsForm.value);    
    const { customerEmail, customerLocation, customerName, customerPhone} = this.requirementsForm.getRawValue();
    let serviceAgreement!:ServiceAgreement;

    if(this.requirements.length>0 && this.validateFieldsRequirement() && this.requirementsForm.valid){ 
      serviceAgreement = {
        dateAgreement: new Date().toUTCString(),
        customerEmail: customerEmail,
        customerName: customerName,
        customerLocation: customerLocation,
        customerPhone: customerPhone,
        requirements: this.requirements,
        sign: this.signImage
      }
    }else {
      this.addRequirementError='Fill the form correctly';
    }
    if(serviceAgreement != undefined){
      this.agreementService.sendAndGeneratePdf(serviceAgreement).subscribe((pdf) => {
        try {
          const url = window.URL.createObjectURL(pdf);
          window.open(url, '_blank');
        } catch (e) {
          console.error('BlobToSaveAs error', e);
        }
      });
    }
  }

}
