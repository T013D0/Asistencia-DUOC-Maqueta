import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseauthService } from './supabaseauth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SupabaseauthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map((user) => {
      if (user) {
        return true;
      }
      return false;
    })
  );
};
