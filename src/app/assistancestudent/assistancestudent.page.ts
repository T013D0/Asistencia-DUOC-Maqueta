import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupabasedataService } from '../supabasedata.service';
import { Asistance, Classes } from 'src/const/database';
import { SupabaseauthService } from '../supabaseauth.service';
import { StorageServiceService } from '../storage-service.service';

@Component({
  selector: 'app-assistancestudent',
  templateUrl: './assistancestudent.page.html',
  styleUrls: ['./assistancestudent.page.scss'],
})
export class AssistancestudentPage implements OnInit {
  isLoading: boolean = true;
  sectionId: string = '';
  studentId: string = '';
  clases: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private supabaseService: SupabasedataService,
    private supabaseAuthService: SupabaseauthService,
    private storageService: StorageServiceService
  ) {
    this.loadData();
  }

  async ngOnInit() {
    this.sectionId = this.activeRoute.snapshot.paramMap.get('id') || '';

    if (!this.sectionId) {
      return;
    }

    const asistance = await this.storageService.get(this.sectionId);

    if (asistance) {
      this.clases = asistance;
      console.log('Data from storage', this.clases);
      
    }
  }

  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }
}
