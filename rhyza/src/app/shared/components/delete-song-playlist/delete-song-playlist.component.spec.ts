import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSongPlaylistComponent } from './delete-song-playlist.component';

describe('DeleteSongPlaylistComponent', () => {
  let component: DeleteSongPlaylistComponent;
  let fixture: ComponentFixture<DeleteSongPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSongPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSongPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
