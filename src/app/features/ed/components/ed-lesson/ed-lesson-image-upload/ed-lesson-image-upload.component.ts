import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-ed-lesson-image-upload',
  templateUrl: './ed-lesson-image-upload.component.html',
  imports: [FileUpload, ToastModule, CommonModule],
  providers: [MessageService],
})
export class EdLessonImageUploadComponent {
  public fileUploadService = inject(FileUploadService);

  public currentUpload = false;

  public onUpload(event: FileUploadHandlerEvent): void {
    const file: File = event.files[0];

    const reader = new FileReader();

    reader.onload = (e): void => {
      this.fileUploadService.uploadedLessonImage.set(e.target?.result as string);
      this.currentUpload = true;
    };

    reader.onerror = (error): void => {
      throw new Error(`Erro lendo imagem do curso: ${error}`);
    };

    reader.readAsDataURL(file);
  }
}
