import { Component } from '@angular/core';

@Component({
  selector: 'app-contribution',
  imports: [],
  template: ` <div class="card">
    <div class="font-semibold text-xl mb-4">Como contribuir</div>
    <div class="flex flex-col items-center justify-center w-full gap-2">
      <p class="my-2">
        <span class="text-primary font-extrabold leading-5 hover:underline">Chave Pix (CNPJ): </span> 48652724000146
      </p>
      <img
        [width]="200"
        [height]="250"
        alt="Qr Code"
        src="https://static.wixstatic.com/media/4723f7_f1237cd922804136ac3a190f87f18c7a~mv2.png/v1/fill/w_153,h_151,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/qrcode.png" />
      <p class="my-2 leading-8 font-semibold text-sm tracking-wide">
        Obrigado por escolher doar para a Igreja Pentecostal Reformada. Estamos honrados por ter
        você como parceiro a fim de ver Jesus ser glorificado na terra. Se você tiver alguma dúvida,
        envie um email para:
        <span class="text-primary font-extrabold underline"
          >igrejapentecostalreformada&#64;gmail.com</span
        >
        ou ligue para <span class="text-primary font-extrabold underline">(19) 98827-9367</span>
      </p>
    </div>
  </div>`,
})
export class Contribution { }
