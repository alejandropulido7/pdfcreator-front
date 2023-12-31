import { CUSTOM_ELEMENTS_SCHEMA, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-modal-loading',
  templateUrl: './modal-loading.component.html',
  styleUrls: ['./modal-loading.component.css'],
  standalone: true,
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [MatProgressSpinnerModule],
})
export class ModalLoadingComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}
