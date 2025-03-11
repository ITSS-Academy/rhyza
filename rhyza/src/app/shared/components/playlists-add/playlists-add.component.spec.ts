import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistsAddComponent } from './playlists-add.component';

describe('PlaylistsAddComponent', () => {
  let component: PlaylistsAddComponent;
  let fixture: ComponentFixture<PlaylistsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistsAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
