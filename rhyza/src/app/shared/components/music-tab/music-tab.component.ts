import {Component, Input} from '@angular/core';
import {SongModel} from '../../../models/song.model';
import {MaterialModule} from '../../material.module';
import {SongService} from '../../../services/song/song.service';
import {IdToNamePipe} from '../../pipes/id-to-name.pipe';



@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [
    MaterialModule,
    IdToNamePipe
  ],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent {
  @Input() cardmusictab!: SongModel;
  constructor(  private songService: SongService,
  ) {
  }
  playSong() {
    if (this.cardmusictab?.id) {
      localStorage.setItem('currentSong', JSON.stringify(this.cardmusictab.id));
    }
    this.songService.setCurrentSong(this.cardmusictab);

  }

}
