import { inject, Injectable, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/models/user.model';
import { injectSupabase } from 'src/app/utils/inject-supabase';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private supabase = injectSupabase();

  public loadingService = inject(LoadingService);

  public messageService = inject(MessageService);

  public users = signal<User[]>([]);

  public async getAllUsers(): Promise<void> {
    this.loadingService.isLoading.set(true);

    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .order('full_name', { ascending: true });

    if (!error) this.users.set(data);

    this.loadingService.isLoading.set(false);

    if (error) {
      this.users.set([]);
    }
  }
}
