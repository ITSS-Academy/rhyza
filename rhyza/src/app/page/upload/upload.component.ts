import { Component } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {MatSelect} from '@angular/material/select';

import {MaterialModule} from '../../shared/material.module';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,
  imports: [
    MatFormField,
    MatOption,
    MatIcon,
    MatSelect,
    MaterialModule
  ],
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

}
