import { Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  public isLoading = input<boolean>(false);
}
