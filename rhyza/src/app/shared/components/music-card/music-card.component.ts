// import { Component } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MaterialModule} from '../../material.module';
import {MusicService} from '../../../services/music.service';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.scss'
})
export class MusicCardComponent {
  @Input() nameArtist="";
  @Input() nameSong="";
  @Input() image="";
  @Input() id= 0;
  constructor(private musicService: MusicService) {
  }

}
