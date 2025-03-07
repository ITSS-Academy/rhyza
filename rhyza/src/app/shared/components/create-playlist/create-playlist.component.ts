import { Component } from '@angular/core';
import {MaterialModule} from '../../material.module';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.scss'
})
export class CreatePlaylistComponent {

}
