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
        console.log(user.user_metadata);
        
        if (user.user_metadata['is_student']){
          router.navigate(['tabs/tab3']);
        }else{
          router.navigate(['tabs/tab2']);
        }
        return true;
      }
      router.navigate(['register']);
      return false;
    })
  )
};
