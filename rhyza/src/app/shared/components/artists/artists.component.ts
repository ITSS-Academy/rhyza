import {Component, Input, OnInit} from '@angular/core';
import {ArtistModel} from '../../../models/artist.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [],
  templateUrl: './artists.component.html',
  styleUrl: './artists.component.scss'
})
export class ArtistsComponent implements OnInit {
  @Input() cardarttist?: ArtistModel;
  constructor(private router: Router) {
  }
  ngOnInit() {
   }

   //navigate to artist detail with param id
    navigateToArtistDetail(id: string){

    if(id){
      this.router.navigate(['artist-detail', id]);

    }
    }

}
