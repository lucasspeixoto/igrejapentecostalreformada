import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<div class="layout-footer">
    <span class="light:text-black">Igreja Pentecostal Reformada</span>
    <a
      href="https://www.igrejapentecostalreformada.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      ><span class="text-primary font-bold hover:underline">Veja mais</span></a
    >
  </div>`,
})
export class AppFooter { }
