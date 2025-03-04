import {Component, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {ArtistModel} from '../../../models/artist.model';
import {MusicTabModel} from '../../../models/musictab.model';

@Component({
  selector: 'app-music-tab',
  standalone: true,
    imports: [
        MatCard,
        MatIcon
    ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent {
  @Input() cardmusictab?: MusicTabModel;

}
