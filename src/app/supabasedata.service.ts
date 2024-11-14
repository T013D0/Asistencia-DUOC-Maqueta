import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';


export interface user {
  email: string;
  password: string;
  isTeacher: boolean;
  isStudent: boolean;
}

export interface asignature {
  code: string;
  id: number;
  name: string;
  
}

export interface classes {
  asignatureId: string;
  date: string;
  id : string;
  teacher: string;
}

@Injectable({
  providedIn: 'root'
})


export class SupabasedataService {
  private supabase: SupabaseClient;
  constructor() { 
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }


getUsers()  {
  return this.supabase.from('users').select('*').then((result)=> result.data);
}

getAsignature() {
  return this.supabase.from('asignature').select('*').then((result)=> result.data);;
}
getClass(){
  return this.supabase.from('class').select('*').then((result)=> result.data);;
}

getAsistance(){
  return this.supabase.from('asistance').select('*').then((result)=> result.data);;
}








  
}
