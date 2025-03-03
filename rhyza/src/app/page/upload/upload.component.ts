import {Component, ElementRef, input, ViewChild,} from '@angular/core';

import {MaterialModule} from '../../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  audioFiles: { name: string; url: string; type: string }[] = [];

  openFilePicker() {
    this.fileInput.nativeElement.click(); // Mở hộp thoại chọn file
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.audioFiles = Array.from(input.files).map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }));
    }
  }

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  imagePreview: string | ArrayBuffer | null = null;

  openImagePicker() {
    this.imageInput.nativeElement.click(); // Mở hộp thoại chọn file
  }
  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result; // Hiển thị ảnh đã chọn trong ô
      };

      reader.readAsDataURL(file);
    }
  }


}
