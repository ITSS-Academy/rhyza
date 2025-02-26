import { Component,  } from '@angular/core';

import {MaterialModule} from '../../shared/material.module';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

}
