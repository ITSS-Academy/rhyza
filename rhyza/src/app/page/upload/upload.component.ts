import {Component, input,} from '@angular/core';

import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  protected readonly input = input;
  protected readonly open = open;
}
