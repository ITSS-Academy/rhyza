import {Component, Input} from '@angular/core';
import {MusicService} from '../../../services/music.service';

@Component({
  selector: 'app-category-home',
  standalone: true,
  imports: [],
  templateUrl: './category-home.component.html',
  styleUrl: './category-home.component.scss'
})
export class CategoryHomeComponent {
  @Input() id: number = 0;
  @Input() title: string = "";
  @Input() image: string = "";
  constructor(private musicService: MusicService) {
  }

}
