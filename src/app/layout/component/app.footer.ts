import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-footer',
  template: `<div class="layout-footer">
    Igreja Pentecostal Reformada
    <a
      href="https://www.igrejapentecostalreformada.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary font-bold hover:underline"
      >Conheça mais</a
    >
  </div>`,
})
export class AppFooter {}
