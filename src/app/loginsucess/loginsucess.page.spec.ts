import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginsucessPage } from './loginsucess.page';

describe('LoginsucessPage', () => {
  let component: LoginsucessPage;
  let fixture: ComponentFixture<LoginsucessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsucessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
