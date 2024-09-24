import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistancescanqrPage } from './assistancescanqr.page';

describe('AssistancescanqrPage', () => {
  let component: AssistancescanqrPage;
  let fixture: ComponentFixture<AssistancescanqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistancescanqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
