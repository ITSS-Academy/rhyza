import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ArtistModel} from '../../models/artist.model';
import {ArtistService} from '../../services/artist/artist.service';

@Pipe({
  name: 'idToName',
  standalone: true,
})
export class IdToNamePipe implements PipeTransform {
  constructor(private artistService: ArtistService) {}

  transform(id: string): Observable<string> {
   if(id !== null && id !== undefined && id !== ''){
     return this.artistService.getArtistById(id).pipe(
       map((artist: ArtistModel) => {
         return artist.name;
       }),
     );
   }else {
      return new Observable<string>(observer => {
        observer.next('Unknown');
      });
   }
  }
}
