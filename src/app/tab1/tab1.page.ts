// tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  constructor(private tabsPage: TabsPage, private router: Router) {}

  ngOnInit() {
    this.tabsPage.hideTabBar = true;
  }

  ionViewWillLeave() {
    this.tabsPage.hideTabBar = false;
  }

  alertButtons = ['Aceptar'];

  //Redireccion a la pagina despues de aceptar el alert
  async presentAlert() {
    this.router.navigate(['/tabs/tab2']);
  }
}
