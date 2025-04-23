import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FileUploadService } from 'src/app/services/file-upload/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  imports: [FileUpload, ToastModule, CommonModule],
  providers: [MessageService],
})
export class FileUploadComponent {
  public fileUploadService = inject(FileUploadService);

  public currentUpload = false;

  public onUpload(event: FileUploadHandlerEvent): void {
    const file: File = event.files[0];

    const reader = new FileReader();

    reader.onload = (e): void => {
      this.fileUploadService.uploadedFileData.set(e.target?.result as string);
      this.currentUpload = true;
    };

    reader.onerror = (error): void => {
      throw new Error(`Erro lendo imagem do curso: ${error}`);
    };

    reader.readAsDataURL(file);
  }
}
