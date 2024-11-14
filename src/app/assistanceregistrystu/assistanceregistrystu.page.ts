import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assistanceregistrystu',
  templateUrl: './assistanceregistrystu.page.html',
  styleUrls: ['./assistanceregistrystu.page.scss'],
})
export class AssistanceregistrystuPage implements OnInit {
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
