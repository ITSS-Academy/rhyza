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
  protected readonly input = input;
  protected readonly open = open;

  openFilePicker() {
    this.fileInput.nativeElement.click(); // Mở hộp thoại chọn file
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('File selected:', input.files[0]); // Xử lý file
    }
  }

  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  imagePreview: string | ArrayBuffer | null = null;

  openImagePicker() {
    this.imageInput.nativeElement.click(); // Kích hoạt hộp thoại chọn file
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result; // Hiển thị ảnh đã chọn
      };

      reader.readAsDataURL(file);
    }
  }
}
