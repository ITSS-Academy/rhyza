import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistModel } from '../../../models/playlist.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  standalone: true,
  imports: [
    MatCardModule
  ],
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent {
  @Input() item!: PlaylistModel; // item không thể null hoặc undefined

  constructor(private router: Router) {}

  navigateToPlaylistDetail(id: string | undefined) {
    if (id) {
      this.router.navigate(['/playlist-detail', id]);
    }
  }
}
