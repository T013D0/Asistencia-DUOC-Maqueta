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
    this.loadData(); }

    ngOnInit() {
      this.sectionId = this.activeRoute.snapshot.paramMap.get('id') || '';
  
      if (!this.sectionId) {
        return;
      }
  
      this.supabaseAuthService.getCurrentUser().subscribe((user) => {
        this.studentId = user?.id || '';
  
        if (!this.studentId) {
          return;
        }
  
        this.supabaseService
          .getClassBySection(this.sectionId, this.studentId)
          .then((result) => {
            this.clases = result.data;
  
            //Get the index number for each class
            this.clases = this.clases.map((clase: any, index: number) => {
              clase.index = index + 1;
              return clase;

              this.supabaseService
              .getAsistance()
              .then((result) => {
                this.asistance = result;
              });
              
            });
          });
      });
    }





































  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }
}
