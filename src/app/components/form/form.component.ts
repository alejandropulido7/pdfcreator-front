import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Requirement } from 'src/app/models/requirement';
import { ServiceAgreement } from 'src/app/models/serviceAgreement';
import { AgreementService } from 'src/app/services/agreement.service';
import { ModalErrorComponent } from '../utils/modal-error/modal-error.component';
import { ModalSuccessComponent } from '../utils/modal-success/modal-success.component';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  requirements: Requirement[] = [];
  addRequirementError:string = '';
  signImage!: string;
  userLogued:User;
  requirementsForm = new FormGroup({
    customerName: new FormControl('', Validators.required),
    customerEmail: new FormControl(''),
    customerPhone: new FormControl(''),
    customerLocation: new FormControl('')
  });
  
  constructor(private agreementService: AgreementService, 
    private authService: AuthService,
    private dialog: MatDialog) {  
    this.requirements.push({
      index: 0,
      name: '',
      description: '',
      priority: '',
      buttonRemove: false
    });
    
  }

  ngOnInit(): void {
      this.authService.getUserLogued().then((user) => {
        this.userLogued = user;
        this.requirementsForm.controls.customerName.setValue(this.userLogued.username);
        this.requirementsForm.controls.customerEmail.setValue(this.userLogued.email);
        this.requirementsForm.controls.customerName.disable();
        this.requirementsForm.controls.customerEmail.disable();
      });      
  }

  

  updateRequirement(requirement: Requirement){
    this.requirements[requirement.index].name = requirement.name;
    this.requirements[requirement.index].description = requirement.description;
    this.requirements[requirement.index].priority = requirement.priority;
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
  }

  validateFieldsRequirement(): boolean{
    const requirement = this.requirements[this.requirements.length-1];
    if(requirement.name == "" ||
    requirement.description == "" ||
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
      this.agreementService.saveAgreement(serviceAgreement).subscribe((response) => {
        this.dialog.open(ModalSuccessComponent, {
          data: {
            message: response.message,
            email: serviceAgreement.customerEmail,
            id: response.id
          },
          width: '300px'
        });
      }, (error) => {
        this.dialog.open(ModalErrorComponent, {
          data: {
            title: 'Error',
            message: error.error.errors[0].msg
          }
        }); 
      });
    }
  }

}
