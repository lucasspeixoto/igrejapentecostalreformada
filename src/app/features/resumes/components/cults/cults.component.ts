import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CultsService } from '../../services/cults.service';
import { SelectModule, type SelectChangeEvent } from 'primeng/select';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengDatePipe } from '../../../../pipes/primeng-date/primeng-date.pipe';
import { Cult } from '../../models/cult';

@Component({
  selector: 'app-cults',
  imports: [
    ButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    PrimengDatePipe,
  ],
  templateUrl: './cults.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CultsComponent implements OnInit {
  public cultsService = inject(CultsService);

  public formGroup = new FormGroup({
    selectedCult: new FormControl<Cult | null>(null),
  });

  public ngOnInit(): void {
    this.cultsService.getAllCultsDataHandler();
  }

  public onCultChangeHandler(event: SelectChangeEvent): void {
    const selectedCult = this.cultsService.cults().find(item => item.id === event.value)!;
    this.cultsService.selectedCult.set(selectedCult);
  }
}
