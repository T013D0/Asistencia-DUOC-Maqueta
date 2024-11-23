import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';
import { SupabasedataService } from '../supabasedata.service';

@Component({
  selector: 'app-assistancegenerate',
  templateUrl: './assistancegenerate.page.html',
  styleUrls: ['./assistancegenerate.page.scss'],
})
export class AssistancegeneratePage implements OnInit, OnDestroy {
  classId: string = '';
  classData: any;
  qrText: string = '';
  isOnline: boolean = navigator.onLine;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabasedataService
  ) {
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));
  }

  updateOnlineStatus() {
    this.isOnline = navigator.onLine;
    if (this.isOnline) {
      this.loadClassData();
    }
  }

  ngOnInit() {
    if (this.isOnline) {
      this.loadClassData();
    }
  }

  loadClassData() {
    this.classId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.supabaseService.getClass(this.classId).then((classData) => {
      this.classData = classData.data;
      this.qrText = this.classData.id
    });
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus.bind(this));
    window.removeEventListener('offline', this.updateOnlineStatus.bind(this));
  }
}
