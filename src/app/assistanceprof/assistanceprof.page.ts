import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistanceprof',
  templateUrl: './assistanceprof.page.html',
  styleUrls: ['./assistanceprof.page.scss'],
})
export class AssistanceprofPage implements OnInit {
  isLoading: boolean = true;

  constructor() {
    this.loadData();
  }

  ngOnInit() {
    
  }
  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }
}

