import {Component, input,} from '@angular/core';

import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  protected readonly input = input;
  protected readonly open = open;
}
