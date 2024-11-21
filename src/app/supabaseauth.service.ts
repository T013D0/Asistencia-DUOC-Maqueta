import { Injectable } from '@angular/core';
import {
  createClient,
  SupabaseClient,
  User,
  Session,
} from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Database } from 'src/const/database';

interface SignUpCredentials {
  email: string;
  password: string;
  metadata?: {
    name?: string;
    last_name?: string;
    rut?: string;
    is_student?: boolean;
  };
}
interface SignUpResponse {
  data: {
    user: User | null;
    session: Session | null;
  } | null;
  error: Error | null;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseauthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient<Database>(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.currentUser.next(session?.user || null);
      } else {
        this.currentUser.next(null);
      }
    });

    this.loadUser();
  }

  async signUp(credentials: SignUpCredentials): Promise<SignUpResponse> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.metadata?.name,
            last_name: credentials.metadata?.last_name,
            rut: credentials.metadata?.rut,
            is_student: credentials.metadata?.is_student || false,
          },
        },
      });

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error('Error in signUp:', error);
      return {
        data: null,
        error:
          error instanceof Error ? error : new Error('Unknown error occurred'),
      };
    }
  }

  // ... rest of your service methods ...

  async loadUser() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();
    this.currentUser.next(user);
  }

  signIn(credentials: { email: string; password: string }) {
    return this.supabase.auth.signInWithPassword(credentials);
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  getCurrentUserId(): string {
    return this.currentUser.value?.id || '';
  }
}
