// register.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';
import { SupabaseauthService } from '../supabaseauth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    rut: [
      '',
      [Validators.required, Validators.pattern(/^[0-9]{7,8}-[0-9Kk]$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  activated = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private supabaseauthService: SupabaseauthService
  ) {}

  ngOnInit() {
    if (!this.activated) {
      this.supabaseauthService.getCurrentUser().subscribe((user) => {
        if (this.activated) return;
        if (user) {
          this.activated = true;
          this.router.navigate([
            user.user_metadata['is_student'] ? '/tabs/tab3' : '/tabs/tab2',
          ]);
        }
      });
    }
  }

  // Getters for easy form control access
  get name() {
    return this.registrationForm.controls.name;
  }
  get last_name() {
    return this.registrationForm.controls.last_name;
  }
  get rut() {
    return this.registrationForm.controls.rut;
  }
  get email() {
    return this.registrationForm.controls.email;
  }
  get password() {
    return this.registrationForm.controls.password;
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  validateRut(rut: string): boolean {
    // Enhanced RUT validation
    if (!/^[0-9]{7,8}-[0-9Kk]$/.test(rut)) return false;

    let [number, verifier] = rut.split('-');
    verifier = verifier.toLowerCase();

    let sum = 0;
    let multiplier = 2;

    for (let i = number.length - 1; i >= 0; i--) {
      sum += parseInt(number[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedVerifier = 11 - (sum % 11);
    const calculatedVerifier =
      expectedVerifier === 11
        ? '0'
        : expectedVerifier === 10
        ? 'k'
        : expectedVerifier.toString();

    return calculatedVerifier === verifier;
  }

  markFormGroupTouched(formGroup: any) {
    Object.values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  async register() {
    this.markFormGroupTouched(this.registrationForm);

    if (!this.registrationForm.valid) {
      return;
    }

    if (!this.validateRut(this.rut.value)) {
      await this.showAlert('Error', 'El RUT ingresado no es válido');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'circular',
    });
    await loading.present();

    const is_student = this.email.value.includes('@duocuc.cl');
    const is_teacher = this.email.value.includes('@profesor.duocuc.cl');

    if (!is_student && !is_teacher) {
      await loading.dismiss();
      await this.showAlert('Error', 'El correo electrónico no es válido');
      return;
    }

    try {
      const response = await this.supabaseauthService.signUp({
        email: this.email.value,
        password: this.password.value,
        metadata: {
          name: this.name.value,
          last_name: this.last_name.value,
          rut: this.rut.value,
          is_student: is_student,
        },
      });

      if (response.error) {
        await loading.dismiss();
        let errorMessage = 'Error al registrar usuario';

        // Type guard to check if the error is an AuthError
        if (response.error instanceof Error) {
          if (response.error.message.includes('email')) {
            errorMessage = 'El correo electrónico ya está registrado';
          } else {
            errorMessage = response.error.message;
          }
        }

        await this.showAlert('Error', errorMessage);
        return;
      }

      await loading.dismiss();
      await this.showAlert('Éxito', 'Usuario registrado exitosamente');
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      await loading.dismiss();
      await this.showAlert(
        'Error',
        'Ocurrió un error al registrar el usuario. Por favor, intenta nuevamente.'
      );
    }
  }
}
