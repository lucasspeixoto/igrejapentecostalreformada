import type { IUserRole } from '../../../domain/models/auth.model';
import { computed, inject, Injectable, signal } from "@angular/core";
import { UserRolesService } from '../../services/user-roles/user-roles-service';


@Injectable({
  providedIn: 'root',
})
export class UserRolesRepository {
  private userRolesService = inject(UserRolesService);

  public currentUserRole = signal<IUserRole | null>(null);

  public isUserAdmin = computed(() => {
    return this.currentUserRole()?.role === 'admin' ? true : false;
  })

  public async getUserRoleData(userId: string): Promise<void> {
    const { data: userData } = await this.userRolesService.getUserRoleData(userId);
    this.currentUserRole.set(userData);
  }
}
