import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabasedataService } from '../supabasedata.service';
import { SupabaseauthService } from '../supabaseauth.service';

@Component({
  selector: 'app-assistanceregistry',
  templateUrl: './assistanceregistry.page.html',
  styleUrls: ['./assistanceregistry.page.scss'],
})
export class AssistanceregistryPage implements OnInit {
  isLoading: boolean = true;
  sectionId: string = '';
  studentId: string = '';
  clases: any;
  asistance: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private supabaseService: SupabasedataService,
    private supabaseAuthService: SupabaseauthService
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.sectionId = this.activeRoute.snapshot.paramMap.get('id') || '';

    if (!this.sectionId) {
      return;
    }

    this.supabaseAuthService.getCurrentUser().subscribe(async (user) => {
      this.studentId = user?.id || '';

      if (!this.studentId) {
        return;
      }

      const { data, error } =
        await this.supabaseService.getAsistanceByTeacherOfSection(
          this.sectionId
        );

      if (error) {
        console.error('Error fetching data:', error.message);
      }

      if (data) {
        data.class.map((c: any, index: any) => {
          return c.index = index + 1;
        });
        this.asistance = data;
        console.log(data);
      }
    });
  }
  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }
}
