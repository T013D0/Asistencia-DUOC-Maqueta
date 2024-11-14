import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistanceregistry',
  templateUrl: './assistanceregistry.page.html',
  styleUrls: ['./assistanceregistry.page.scss'],
})
export class AssistanceregistryPage implements OnInit {
  isLoading: boolean = true;

  constructor() {
    this.loadData(); }

  ngOnInit() {
  }
  loadData() {
    // Simulate data loading
    setTimeout(() => {
      this.isLoading = false; // Set to false after loading is complete
    }, 2000); // Adjust time as needed
  }
}
