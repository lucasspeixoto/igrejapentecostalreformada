import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { EditorModule } from 'primeng/editor';

const PRIMENG = [EditorModule, SelectModule];

const COMMON = [FormsModule];

@Component({
  selector: 'app-ed-lessons-panel',
  imports: [...PRIMENG, ...COMMON],
  templateUrl: './ed-lessons-panel.component.html',
})
export class EdLessonsPanelComponent implements OnInit {
  public editorContent = '';

  lessons:
    | {
        name: string;
        code: string;
      }[]
    | undefined;

  selectedLesson:
    | {
        name: string;
        code: string;
      }
    | undefined;

  public ngOnInit(): void {
    this.lessons = [
      { name: 'Aula 1', code: '1' },
      { name: 'Aula 2', code: '2' },
      { name: 'Aula 3', code: '3' },
      { name: 'Aula 4', code: '4' },
      { name: 'Aula 5', code: '5' },
    ];
  }
}
