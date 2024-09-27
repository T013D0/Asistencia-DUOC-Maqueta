import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistanceprofPage } from './assistanceprof.page';

describe('AssistanceprofPage', () => {
  let component: AssistanceprofPage;
  let fixture: ComponentFixture<AssistanceprofPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceprofPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
