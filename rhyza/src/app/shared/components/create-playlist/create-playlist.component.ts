import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';
import { PlaylistModel } from '../../../models/playlist.model';
import { AuthModel } from '../../../models/auth.model';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {MatDialogTitle} from '@angular/material/dialog';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatDialogTitle
  ],
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {
  playlistForm: FormGroup;
  authData: AuthModel | null = null;
  formData: PlaylistModel;
  imageUrl: string | ArrayBuffer | null = null;


  constructor(
    private fb: FormBuilder,
    private store: Store<{ auth: AuthState }>
  ) {
    this.playlistForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image_url: ['', Validators.required]
    });

    // Khởi tạo formData với các giá trị mặc định
    this.formData = {
      id: '',
      name: '',
      description: '',
      image_url: '',
      total_tracks: 0,
      author_description: '',
      uid: '',
      songs_id: [],
      is_pined: false,
      created_at: new Date().toISOString()
    };
  }

  ngOnInit() {
    this.store.select((state) => state.auth.authData).subscribe((authData) => {
      this.authData = authData;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.playlistForm.patchValue({
          image_url: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  confirm() {
    if (this.playlistForm.valid) {
      // Cập nhật formData với giá trị từ form
      this.formData = {
        id: '', // ID sẽ được tạo tự động hoặc từ server
        name: this.playlistForm.get('name')?.value || '',
        description: this.playlistForm.get('description')?.value || '',
        image_url: this.playlistForm.get('image_url')?.value || '',
        total_tracks: 0, // Số lượng bài hát sẽ được cập nhật sau
        author_description: '', // Mô tả tác giả sẽ được cập nhật sau
        uid: this.authData?.uid || '',
        songs_id: [], // Danh sách bài hát sẽ được cập nhật sau
        is_pined: false, // Giá trị mặc định
        created_at: new Date().toISOString() // Thêm thuộc tính created_at
      };

      // Dispatch action để tạo playlist
      if (this.authData?.uid && this.authData?.idToken) {
        this.store.dispatch(PlaylistActions.createPlaylist({
          playlist: this.formData,
          idToken: this.authData.idToken
        }));
      }
    }
  }
}
