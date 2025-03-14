import {Component, ElementRef, inject, input, OnInit, ViewChild,} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SongModel} from '../../models/song.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {async, Observable, startWith, Subscription} from 'rxjs';
import {AuthModel} from '../../models/auth.model';
import * as SongActions from '../../ngrx/song/song.actions';
import {CategoryState} from '../../ngrx/category/category.state';
import {CategoryModel} from '../../models/category.model';
import {CategoryService} from '../../services/category/category.service';
import {map} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {ArtistModel} from '../../models/artist.model';
import {ArtistState} from '../../ngrx/artist/artist.state';
import {SongState} from '../../ngrx/song/song.state';
import {LoginComponent} from '../../shared/components/login/login.component';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    LoginComponent
  ],
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit{
  categoryIdTemp: string = '';
  artistIdTemp: string = '';

uploadForm = new FormGroup({
  title: new FormControl('', Validators.required),
  composer: new FormControl('', Validators.required),
  performer_ref: new FormControl('', Validators.required),
  performer_name: new FormControl('', Validators.required),
  file_path: new FormControl<File | null>(null, Validators.required),
  image_url: new FormControl<File | null>(null, Validators.required),
  category_id: new FormControl('', Validators.required),
  category_name: new FormControl('', Validators.required),
  uuid: new FormControl(''),
  createdAt: new FormControl(''),
  views: new FormControl(0),
});



auth$ !: Observable<AuthModel| null>;
categoryList$ !: Observable<CategoryModel[]>;
  authData: AuthModel | null = null;
  subcription: Subscription[] = [];
  categoryList: CategoryModel[] = [];
  artist$ !: Observable<ArtistModel[]>;
  artistList: ArtistModel[] = [];
  isLoading$ !: Observable<boolean>;

  constructor(private store: Store<{
    auth:AuthState,
    category:CategoryState,
    artist:ArtistState
    song: SongState
  }>) {
    this.auth$ = this.store.select('auth', 'authData');
    this.categoryList$ = this.store.select('category', 'categoryList');
    this.artist$ = this.store.select('artist', 'artistList');
    this.isLoading$ = this.store.select('song','isCreating')
  }
  @ViewChild('genreInput') genreInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.subcription.push(
      this.auth$.subscribe((authData) => {
        if(authData?.idToken){
          this.authData = authData;
        }
      }),
      this.categoryList$.subscribe((categoryList) => {
        if (categoryList.length > 0) {
         this.categoryList = categoryList;
          this.uploadForm.controls['category_id'].updateValueAndValidity();
          this.uploadForm.controls['category_name'].setValidators([
            Validators.required,
            this.matchListValidator(this.categoryList, 'category_id')
          ]);
          this.uploadForm.controls['category_name'].updateValueAndValidity();

        }
      }),

      this.artist$.subscribe((artistList) => {
        if (artistList.length>0) {
          this.artistList = artistList;
          this.uploadForm.controls['performer_ref'].updateValueAndValidity();
          this.uploadForm.controls['performer_name'].setValidators([
            Validators.required,
            this.matchListValidator(this.artistList, 'performer_ref')
          ]);
          this.uploadForm.controls['performer_name'].updateValueAndValidity();
        }
      }),
    );




    this.categoryList$ = this.uploadForm.controls['category_name'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value ? value.toString() : ''))
    );

    this.artist$ = this.uploadForm.controls['performer_name'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterArtist(value ? value.toString() : ''))
    );



  }
  private _filter(value: string): CategoryModel[] {
    if (!this.categoryList || !Array.isArray(this.categoryList)) {
      return [];
    }

    const filterValue = value.trim().toLowerCase();

    // Nếu value rỗng, trả về toàn bộ danh sách thay vì lọc
    return filterValue ? this.categoryList.filter(option =>
      option.name?.toLowerCase().includes(filterValue)
    ) : this.categoryList;
  }

  onCategorySelected(event: MatAutocompleteSelectedEvent) {
    const selectedName = event.option.value; // Giá trị name
    const selectedCategory = this.categoryList.find(cat => cat.name === selectedName); // Tìm category
    if (selectedCategory) {
      this.uploadForm.patchValue({ category_id: selectedCategory.id, category_name: selectedCategory.name });
    }
  }


  private _filterArtist(value: string): ArtistModel[] {
    if (!this.artistList || !Array.isArray(this.artistList)) {
      return [];
    }

    const filterValue = value.trim().toLowerCase();

    // Nếu value rỗng, trả về toàn bộ danh sách thay vì lọc
    return filterValue ? this.artistList.filter(option =>
      option.name?.toLowerCase().includes(filterValue)
    ) : this.artistList;
  }


  onArtistSelected(event: MatAutocompleteSelectedEvent) {
    const selectedName = event.option.value; // Giá trị name
    const selectedArtist = this.artistList.find(cat => cat.name === selectedName); // Tìm category
    if (selectedArtist) {
      this.uploadForm.patchValue({ performer_ref: selectedArtist.id, performer_name: selectedArtist.name });
    }
  }

  matchListValidator(list: any[], idControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const match = list.some(item => item.name === value);
      if (!match) {
        (this.uploadForm.get(idControlName) as FormControl).setValue('');

      }
      return match ? null : { matchList: true };
    };
  }




  formData: SongModel={} as SongModel;
  confirmForm() {
    this.formData = {
      file_path: this.uploadForm.value.file_path ?? '',
      image_url: this.uploadForm.value.image_url ?? '',
      title: this.uploadForm.value.title ?? '',
      composer: this.uploadForm.value.composer ?? '',
      performer_ref: this.uploadForm.value.performer_ref ?? '',
      category_id: this.uploadForm.value.category_id ?? '',
      uuid: this.authData?.uid ?? '',
      createdAt: new Date().toISOString(),
      views: 0,
    } as SongModel;


    this.store.dispatch(SongActions.createSong({song: this.formData, idToken: this.authData?.idToken ?? ''}));

    this.uploadForm.reset()
  }





  onAudioSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Kiểm tra định dạng file
      const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aiff', 'audio/alac'];
      if (!allowedAudioTypes.includes(file.type)) {
        alert('Chỉ được chọn file audio (.mp3, .wav, .flac, .aiff, .alac)');
        return;
      }

      this.uploadForm.patchValue({ file_path: file });
    }
  }




  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  imagePreview: string | ArrayBuffer | null = null;


  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Kiểm tra định dạng file ảnh
      const allowedImageTypes = ['image/jpeg', 'image/png'];
      if (!allowedImageTypes.includes(file.type)) {
        alert('Chỉ được chọn file ảnh (.jpg, .png)');
        return;
      }

      // Đọc file và hiển thị ảnh xem trước
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.uploadForm.patchValue({ image_url: file });
    }
  }


  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Add some visual feedback
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.style.borderColor = 'green';
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual feedback
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.style.borderColor = 'white';
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.style.borderColor = 'white';
    }
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aiff', 'audio/alac'];
      if (!allowedAudioTypes.includes(file.type)) {
        alert('Chỉ được chọn file audio (.mp3, .wav, .flac, .aiff, .alac)');
        return;
      }
      this.uploadForm.patchValue({ file_path: file });
      event.dataTransfer.clearData();
    }
  }
  onImageDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Add some visual feedback
    const uploadImage = document.getElementById('upload-image');
    if (uploadImage) {
      uploadImage.style.borderColor = 'green';
    }
  }

  onImageDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual feedback
    const uploadImage = document.getElementById('upload-image');
    if (uploadImage) {
      uploadImage.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    }
  }

  onImageDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const uploadImage = document.getElementById('upload-image');
    if (uploadImage) {
      uploadImage.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    }
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const allowedImageTypes = ['image/jpeg', 'image/png'];
      if (!allowedImageTypes.includes(file.type)) {
        alert('Chỉ được chọn file ảnh (.jpg, .png)');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.uploadForm.patchValue({ file_path: file });
      event.dataTransfer.clearData();
    }
  }



  protected readonly async = async;


  protected readonly Validators = Validators;
}
