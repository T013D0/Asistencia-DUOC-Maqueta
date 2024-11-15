import { SupabaseauthService } from './../supabaseauth.service';
import { Component, OnInit } from '@angular/core';
import { SupabasedataService } from '../supabasedata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistanceprof',
  templateUrl: './assistanceprof.page.html',
  styleUrls: ['./assistanceprof.page.scss'],
})
export class AssistanceprofPage implements OnInit {
  isLoading: boolean = true;
  sections: any;
  asistances: any;
  userId: string = '';
  

  constructor(
    private supabaseService: SupabasedataService,
    private SupabaseauthService: SupabaseauthService,
    private router: Router
    
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.SupabaseauthService.getCurrentUser().subscribe((user) => {
      this.userId = user?.id || '';

      if (!this.userId) {
        return;
      }

      this.supabaseService
        .getAsistanceByClassProf(this.userId)
        .then((sections) => {
          this.sections = sections.data;
          
        });
    });
  }

  gotoAsistanceRegistry(id: string) {
    this.router.navigate(['/assistanceregistry/' + id]);
  }


  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }



  
}

