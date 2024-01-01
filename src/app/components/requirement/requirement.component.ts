import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Requirement } from 'src/app/models/requirement';
import { PRIORITY, REQUIREMENTS_TYPES } from 'src/app/shared/constants';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css']
})
export class RequirementComponent {
  @Input() requirementChild!: Requirement;
  @Input() index!: number;
  @Output() updateRequirement = new EventEmitter<Requirement>();
  @Output() removeReq= new EventEmitter<Requirement>();

  name:string = '';
  description:string = '';
  priority:string = '';

  requirementSelect:string = '0';
  nameRequirementsList:string[] = REQUIREMENTS_TYPES;
  prioritySelected:string = '0';
  priorityList:string[] = PRIORITY;


  assignRequirement():Requirement{

    this.name = this.requirementSelect !== "0" ? this.requirementSelect : "";
    this.priority = this.prioritySelected !== "0" ? this.prioritySelected : "";
    return {
      index: this.index,
      name: this.name,
      description: this.description,
      priority: this.priority
    }
  }

  saveRequirement(){
    this.updateRequirement.emit(this.assignRequirement());    
  }

  removeRequirement(){
    this.removeReq.emit(this.assignRequirement());
  }

}
