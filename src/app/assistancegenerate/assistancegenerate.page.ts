import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistancegenerate',
  templateUrl: './assistancegenerate.page.html',
  styleUrls: ['./assistancegenerate.page.scss'],
})
export class AssistancegeneratePage implements OnInit {
  classId: string | null | undefined;
  classData: any;

  qrText: string | null | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  ngOnInit() {
    console.log('AssistancegeneratePage');

    this.classId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('classId', this.classId);

    if (this.classId === null) {
      console.log('No class id');
      this.router.navigate(['/tabs/tab1']);
      return;
    }

    this.firestore.getClassData(this.classId).subscribe((data) => {
      console.log('data', data);
      this.classData = data[0];
    });
  }
}
