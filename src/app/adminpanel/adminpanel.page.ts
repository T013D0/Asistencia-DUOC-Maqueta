import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SupabasedataService } from '../supabasedata.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {
  isLoading: boolean = true;
  selectedTab: 'asignature' | 'section' | 'student' = 'asignature';
  selectedSectionId: string | null = null;
  sectionStudents: any;
  

  asignatureForm: FormGroup;
  sectionForm: FormGroup;
  studentForm: FormGroup;

  asignatures: any;
  teachers: any;
  students: any;
  sections: any;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabasedataService,
    private toastController: ToastController,
    private alertController: AlertController,
    private ReactiveFormsModule: ReactiveFormsModule
  ) {
    // Asignature Form
    this.asignatureForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
    });

    // Section Form
    this.sectionForm = this.fb.group({
      asignatureId: ['', Validators.required],
      teacherId: ['', Validators.required],
      number: ['', [Validators.required, Validators.min(1)]],
    });

    // Student Form
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required],
      sectionId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    // Fetch initial data (asignatures, teachers, students, sections)
    Promise.all([
      this.loadAsignatures(),
      this.loadTeachers(),
      this.loadStudents(),
      this.loadSections()
    ]).then(() => {
      // Set loading to false once all data is loaded
      this.isLoading = false;
    }).catch(error => {
      console.error('Error loading initial data', error);
      this.isLoading = false;
    });
  }

  async loadStudents() {
    try {
      const { data, error } = await this.supabaseService.getStudents();
      if (error) throw error;
      this.students = data;
    } catch (error) {
      this.presentErrorToast('Error en cargar estudiantes');
    }
  }

  async loadSections() {
    try {
      const { data, error } = await this.supabaseService.getSections();
      if (error) throw error;
      this.sections = data || [];
    } catch (error) {
      this.presentErrorToast('Error en cargar secciones');
    }
  }

  async addStudentToSection() {
    if (this.studentForm.valid) {
      const { studentId, sectionId } = this.studentForm.value;
      const { data, error } = await this.supabaseService.addStudentToSection(
        sectionId,
        studentId
      );

      if (error) {
        this.presentErrorToast('Error al añadir estudiante a la sección');
        console.error(error);
        return;
      }

      if (data) {
        await this.presentSuccessToast(
          'Estudiante añadido correctamente a la sección'
        );
        this.studentForm.reset();
      }
    }
  }
  async loadSectionStudents(event: any) {
    const sectionId = event.detail.value;
    this.selectedSectionId = sectionId;

    if (!sectionId) {
      this.sectionStudents = [];
      return;
    }

    try {
      const { data, error } = await this.supabaseService.getStudentsBySection(
        sectionId
      );
      if (error) {
        throw error;
      }

      if (data) {
        this.sectionStudents = data;
        console.log(data);
      }
    } catch (error) {
      console.error('Error loading section students:', error);
      this.presentErrorToast('Error al cargar los estudiantes de la sección');
      this.sectionStudents = [];
    }
  }

  async addStudentToList() {
    if (this.studentForm.valid) {
      const { studentId, sectionId } = this.studentForm.value;
      const { data, error } = await this.supabaseService.addStudentToList(
        sectionId,
        studentId
      );

      if (error) {
        this.presentErrorToast('Error al añadir estudiante a la lista');
        console.error(error);
        return;
      }

      if (data) {
        await this.presentSuccessToast(
          'Estudiante añadido correctamente a la lista'
        );
        this.studentForm.reset();
        // Refresh the student list
        await this.loadSectionStudents({ detail: { value: sectionId } });
      }
    }
  }
  


  async loadAsignatures() {
    try {
      const data = await this.supabaseService.getAsignature();
      this.asignatures = data || [];
    } catch (error) {
      this.presentErrorToast('Error en cargar asignaturas');
    }
  }

  async loadTeachers() {
    const { data, error } = await this.supabaseService.getTeachers();
    // Assuming teachers have a specific role or attribute
    if (error) {
      this.presentErrorToast('Error en cargar profesores');
    }

    if (data) {
      this.teachers = data;
      console.log(data);
    }
  }

  async addAsignature() {
    if (this.asignatureForm.valid) {
      const { name, code } = this.asignatureForm.value;
      const { data, error } = await this.supabaseService.generateAsignature(
        name,
        code
      );

      if (error) {
        this.presentErrorToast('Error en añadir asignatura');
        return;
      }

      if (data) {
        await this.presentSuccessToast('Asignatura añadida correctamente');
        this.asignatureForm.reset();
        this.loadAsignatures(); // Refresh the list
      }
    }
  }

  async addSection() {
    if (this.sectionForm.valid) {
      const { asignatureId, teacherId, number } = this.sectionForm.value;
      const { data, error } = await this.supabaseService.generateSection(
        asignatureId,
        teacherId,
        number
      );

      if (error) {
        this.presentErrorToast('Error en añadir seccion');
        console.log(error);

        return;
      }

      if (data) {
        await this.presentSuccessToast('Seccion añadida correctamente');
        this.sectionForm.reset();
      }
    }
  }

  async getStudentsBySection(sectionId: string) {
    const { data, error } = await this.supabaseService.getStudentsBySection(
      sectionId
    );

    if (error) {
      this.presentErrorToast('Error en cargar estudiantes');
      console.error(error);
      return;
    }

    if (data) {
      console.log(data);
    }
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
    });
    toast.present();
  }

  segmentChanged(event: any) {
    this.selectedTab = event.detail.value;
  }


  async removeStudentFromList(sectionId: string, studentId: string) {
    try {
      const { data, error } = await this.supabaseService.removeStudentFromList(
        sectionId,
        studentId
      );
  
      if (error) {
        this.presentErrorToast('Error al eliminar estudiante de la lista');
        console.error(error);
        return;
      }
  
      await this.presentSuccessToast('Estudiante eliminado correctamente de la lista');
      
      // Refresh the student list
      await this.loadSectionStudents({ detail: { value: sectionId } });
    } catch (error) {
      console.error('Error removing student:', error);
      this.presentErrorToast('Error al eliminar estudiante de la lista');
    }
  }

  async confirmRemoveStudent(studentId: string, studentName: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro que desea eliminar a ${studentName} de esta sección?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            if (this.selectedSectionId) {
              this.removeStudentFromList(this.selectedSectionId, studentId);
            } else {
              this.presentErrorToast('No se ha seleccionado ninguna sección');
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }


}
