import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabasedataService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  getStudent(id: string) {
    return this.supabase.from('student').select('*').eq('id', id).single();
  }

  getTeacher(id: string) {
    return this.supabase.from('teacher').select('*').eq('id', id).single();
  }

  getUsers() {
    return this.supabase
      .from('users')
      .select('*')
      .then((result) => result.data);
  }

  getAsignature() {
    return this.supabase
      .from('asignature')
      .select('*')
      .then((result) => result.data);
  }

  getAsistance() {
    return this.supabase
      .from('asistance')
      .select('*')
      .then((result) => result.data);
  }

  getSectionsByUser(idUser: string) {
    return this.supabase
      .from('list')
      .select('*, section(*, asignature(*))')
      .eq('student', idUser);
  }

  getTeachers() {
    return this.supabase.from('teacher').select('*');
  }

  getSectionsByTeacher(idUser: string) {
    return this.supabase
      .from('section')
      .select('*, asignature(*)')
      .eq('teacher', idUser);
  }

  generateClass(sectionId: string) {
    return this.supabase
      .from('class')
      .insert({ sectionId: sectionId, date: new Date() })
      .select('*')
      .single();
  }

  generateSection(asignatureId: string, teacherId: string, number: number) {
    return this.supabase
      .from('section')
      .insert({
        asignatureId: asignatureId,
        teacher: teacherId,
        number: number,
      })
      .select('*')
      .single();
  }

  generateAsignature(name: string, code: string) {
    return this.supabase
      .from('asignature')
      .insert({ name: name, code: code })
      .select('*')
      .single();
  }

  generateAsistance(classId: string, studentId: string) {
    return this.supabase
      .from('asistance')
      .update({ is_present: true })
      .eq('classId', classId)
      .eq('studentId', studentId)
      .select('*')
      .single();
  }

  isAlreadyAssisted(classId: string, studentId: string) {
    return this.supabase
      .from('asistance')
      .select('*')
      .eq('classId', classId)
      .eq('studentId', studentId)
      .single();
  }
  getClass(id: string) {
    return this.supabase.from('class').select('*').eq('id', id).single();
  }

  getAsistanceByClassProfe(sectionId: string) {
    return this.supabase
      .from('asistance')
      .select('*, class(*)')
      .eq('class.sectionId', sectionId);
  }
  getAssistanceByClassStudent(classId: string, studentId: string) {
    return this.supabase
      .from('asistance')
      .select('*')
      .eq('classId', classId)
      .eq('studentId', studentId)
      .single();
  }

  getClassBySection(sectionId: string, studentId: string) {
    return this.supabase
      .from('asistance')
      .select('*, class(*)')
      .eq('class.sectionId', sectionId)
      .eq('studentId', studentId);
  }

  getAsistanceByClassProf(teacherId: string) {
    return this.supabase
      .from('section')
      .select('*, asignature(*)')
      .eq('teacher', teacherId);
  }

  getAsistanceByClass(classId: string) {
    return this.supabase.from('asistance').select('*').eq('classId', classId);
  }

  getSectionList(sectionId: string) {
    return this.supabase
      .from('list')
      .select('*, section(*, asignature(*)), student(*)')
      .eq('sectionId', sectionId)
      .single();
  }

  getAsistanceByTeacherOfSection(sectionId: string) {
    return this.supabase
      .from('section')
      .select('*, class(*, asistance(*, student(*))), asignature(*)')
      .eq('id', sectionId)
      .single();
  }

  addStudentToSection(sectionId: string, studentId: string) {
    return this.supabase
      .from('list')
      .insert({ sectionId: sectionId, student: studentId })
      .select('*')
      .single();
  }

  addStudentToList(sectionId: string, studentId: string) {
    return this.supabase
      .from('list')
      .insert({ sectionId: sectionId, student: studentId })
      .select('*')
      .single();
  }

  getStudents() {
    return this.supabase.from('student').select('*');
  }

  getStudentsBySection(sectionId: string) {
    return this.supabase
      .from('list')
      .select('*, student(*)')
      .eq('sectionId', sectionId);
  }

  getSections() {
    return this.supabase.from('section').select('*, asignature(*)');
  }

  removeStudentFromList(sectionId: string, studentId: string) {
    return this.supabase
      .from('list')
      .delete()
      .match({
        sectionId: sectionId,
        student: studentId
      })
      .select('*')
      .single();
  }


}
