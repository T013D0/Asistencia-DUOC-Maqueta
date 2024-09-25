import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistancestudentPage } from './assistancestudent.page';

describe('AssistancestudentPage', () => {
  let component: AssistancestudentPage;
  let fixture: ComponentFixture<AssistancestudentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistancestudentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
