
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabasedataService } from '../supabasedata.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.page.html',
  styleUrls: ['./adminpanel.page.scss'],
})
export class AdminpanelPage implements OnInit {
  selectedTab: 'asignature' | 'section' = 'asignature';
  
  asignatureForm: FormGroup;
  sectionForm: FormGroup;

  asignatures: any[] = [];
  teachers: any;

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
      code: ['', [Validators.required, Validators.minLength(2)]]
    });

    // Section Form
    this.sectionForm = this.fb.group({
      asignatureId: ['', Validators.required],
      teacherId: ['', Validators.required],
      number: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadAsignatures();
    this.loadTeachers();
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
      const {data, error} = await this.supabaseService.getTeachers();
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
      try {
        const { name, code } = this.asignatureForm.value;
        const result = await this.supabaseService.generateAsignature(name, code);
        
        if (result) {
          await this.presentSuccessToast('Asignatura añadida correctamente');
          this.asignatureForm.reset();
          this.loadAsignatures(); // Refresh the list
        }
      } catch (error) {
        this.presentErrorToast('Error en añadir asignatura');
      }
    }
  }

  async addSection() {
    if (this.sectionForm.valid) {
      try {
        const { asignatureId, teacherId, number } = this.sectionForm.value;
        const result = await this.supabaseService.generateSection(
          asignatureId, 
          teacherId, 
          number
        );
        
        if (result) {
          await this.presentSuccessToast('Seccion añadida correctamente');
          this.sectionForm.reset();
        }
      } catch (error) {
        this.presentErrorToast('Error en añadir seccion');
      }
    }
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  segmentChanged(event: any) {
    this.selectedTab = event.detail.value;
  }
}