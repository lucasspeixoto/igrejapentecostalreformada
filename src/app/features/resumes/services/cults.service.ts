import { computed, inject, Injectable, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { injectSupabase } from '../../../utils/inject-supabase';
import { LoadingService } from '../../../services/loading/loading.service';
import { Cult } from '../models/cult';

@Injectable({
  providedIn: 'root',
})
export class CultsService {
  private supabase = injectSupabase();

  private loadingService = inject(LoadingService);

  private messageService = inject(MessageService);

  private sanitizer = inject(DomSanitizer);

  public cults = signal<Cult[]>([]);

  public selectedCult = signal<Cult | null>(null);

  public selectedVideoUrl = computed(() => {
    const videoId = this.selectedCult()?.video_url.split('?v=')[1]!;
    return this.embeddedVideoUrl(videoId);
  });

  public async getAllCultsDataHandler(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('cults')
      .select('*, users(full_name)')
      .order('date', { ascending: false });

    if (error) {
      this.cults.set([]);
      this.messageService.add({
        severity: 'warn',
        summary: 'Erro',
        detail: 'Erro ao carregar sermões, tente novamente mais tarde!',
        life: 3000,
      });
    } else {
      this.cults.set(data);
      this.selectedCult.set(data[0]);
    }

    this.loadingService.isLoading.set(false);
  }

  public embeddedVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public generateVideoThumbImageUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
}
