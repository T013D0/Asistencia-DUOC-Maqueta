import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistancegenerate',
  templateUrl: './assistancegenerate.page.html',
  styleUrls: ['./assistancegenerate.page.scss'],
})
export class AssistancegeneratePage implements OnInit, OnDestroy {
  classId: string | null | undefined;
  classData: any;
  qrText: string | null | undefined;
  isOnline: boolean = navigator.onLine;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: FirestoreService
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
    console.log('AssistancegeneratePage');
    this.classId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('classId', this.classId);

    if (this.classId === null) {
      console.log('No class id');
      this.router.navigate(['/tabs/tab1']);
      return;
    }

    if (this.isOnline) {
      this.loadClassData();
    }
  }

  loadClassData() {
    if (this.classId) {
      this.firestore.getClassData(this.classId).subscribe((data) => {
        console.log('data', data);
        this.classData = data[0];
        this.qrText = JSON.stringify(this.classData);
      });
    }
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.updateOnlineStatus.bind(this));
    window.removeEventListener('offline', this.updateOnlineStatus.bind(this));
  }
}