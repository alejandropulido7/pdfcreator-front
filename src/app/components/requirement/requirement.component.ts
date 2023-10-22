import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Requirement } from 'src/app/models/requirement';

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

  assignRequirement():Requirement{
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
