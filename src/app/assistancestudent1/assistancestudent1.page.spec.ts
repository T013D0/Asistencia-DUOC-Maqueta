import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Assistancestudent1Page } from './assistancestudent1.page';

describe('Assistancestudent1Page', () => {
  let component: Assistancestudent1Page;
  let fixture: ComponentFixture<Assistancestudent1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Assistancestudent1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
