import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {ShareModule} from '../../share.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PlaylistModel} from '../../../models/playlist.model';
import { Store } from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../models/auth.model';
import * as PlaylistActions from "../../../ngrx/playlist/playlist.actions"

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [MaterialModule, ShareModule],
  templateUrl: './create-playlist.component.html',
  styleUrl: './create-playlist.component.scss'
})
export class CreatePlaylistComponent implements OnInit {
  auth$ !: Observable<AuthModel| null>;
  authData : AuthModel | null = null;
  subscription: Subscription[] = [];
  constructor(private  store: Store<{
    auth: AuthState
  }>) {

    this.auth$ = this.store.select('auth','authData')

  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.idToken) {
          this.authData = auth;
        }
      }),
    )
  }


  @ViewChild('fileInput') fileInput!: ElementRef;
  imageUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB. Please select a smaller file.');
        input.form?.reset();
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result;
          this.playlistForm.patchValue({ image_url: file });
        };
        reader.readAsDataURL(file);
      }
    }
  }


  //create form group
  playlistForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    image_url: new FormControl<File | null>(null, [Validators.required]),
  });

  formData: PlaylistModel = {} as PlaylistModel;


  confirm(){

    this.formData = {
      name: this.playlistForm.get('name')?.value || '',
      description: this.playlistForm.get('description')?.value || '',
      image_url: this.playlistForm.get('image_url')?.value || '',
      uid: this.authData?.uid || '',
      is_pined: false,
      songs_id:[],
      id:"",
      created_at: new Date().toISOString(),
    }

    console.log(this.formData)


    if(this.authData?.uid && this.authData?.idToken){
      this.store.dispatch(PlaylistActions.createPlaylist({
        playlist: this.formData,
        idToken: this.authData.idToken
      }))
    }
  }

}
