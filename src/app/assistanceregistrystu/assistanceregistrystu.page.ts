import { Component, OnInit } from '@angular/core';
import { SupabasedataService } from '../supabasedata.service';
import { SupabaseauthService } from '../supabaseauth.service';

@Component({
  selector: 'app-assistanceregistrystu',
  templateUrl: './assistanceregistrystu.page.html',
  styleUrls: ['./assistanceregistrystu.page.scss'],
})
export class AssistanceregistrystuPage implements OnInit {
  isLoading: boolean = true;
  sections: any;
  userId: string = '';

  constructor(
    private supabaseService: SupabasedataService,
    private supabaseauthService: SupabaseauthService
  ) {
    this.loadData();
  }

  ngOnInit() {
    this.supabaseauthService.getCurrentUser().subscribe((user) => {
      this.userId = user?.id || '';

      if (!this.userId) {
        return;
      }

      this.supabaseService.getSectionsByUser(this.userId).then((sections) => {
        this.sections = sections.data;
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
