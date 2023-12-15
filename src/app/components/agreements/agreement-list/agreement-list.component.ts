import { Component, OnInit } from '@angular/core';
import { ServiceAgreement } from 'src/app/models/serviceAgreement';
import { AgreementService } from 'src/app/services/agreement.service';

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrls: ['./agreement-list.component.css']
})
export class AgreementListComponent implements OnInit{
  
  constructor(private serviceAgreement: AgreementService){}

  listAgreements: ServiceAgreement[] = [];

  ngOnInit(): void {
    this.serviceAgreement.findAllAgreements().subscribe((agreement: ServiceAgreement[]) => {
      this.listAgreements = agreement.sort((a, b) => Date.parse(b.dateAgreement) - Date.parse(a.dateAgreement));
    });
  }

}
