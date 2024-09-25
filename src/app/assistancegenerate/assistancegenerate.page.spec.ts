import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistancegeneratePage } from './assistancegenerate.page';

describe('AssistancegeneratePage', () => {
  let component: AssistancegeneratePage;
  let fixture: ComponentFixture<AssistancegeneratePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistancegeneratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
