import {Component, Input} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {MaterialModule} from '../../material.module';



@Component({
  selector: 'app-music-tab',
  standalone: true,
    imports: [
        MaterialModule
    ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent {
  @Input() cardmusictab?: SongModel;

}
