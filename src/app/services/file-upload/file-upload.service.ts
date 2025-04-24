import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  public uploadedCourseImage = signal<string | null>(null);

  public uploadedLessonImage = signal<string | null>(null);
}
