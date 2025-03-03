import {Component, Input} from '@angular/core';
import {ArtistModel} from '../../../models/artist.model';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent {
  @Input() cardarttist?: ArtistModel;

  constructor() {

  }

}
