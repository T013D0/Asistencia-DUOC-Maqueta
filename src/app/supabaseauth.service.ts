import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface SignUpCredentials {
  email: string;
  password: string;
  isStudent?: boolean;
  isTeacher?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseauthService {
  private supabase: SupabaseClient;
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private router: Router) {
    this.supabase = createClient(
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

  async signUp(credentials: SignUpCredentials) {
    try {
      // Sign up the user
      const { data, error } = await this.supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            isStudent: credentials.isStudent || false,
            isTeacher: credentials.isTeacher || false,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create a profile for the user
        const { error: profileError } = await this.supabase.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          is_student: credentials.isStudent || false,
          is_teacher: credentials.isTeacher || false,
        });

        if (profileError) throw profileError;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error in signUp:', error);
      return { data: null, error };
    }
  }

  // ... rest of your service methods ...

  async loadUser() {
    const { data: { user } } = await this.supabase.auth.getUser();
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