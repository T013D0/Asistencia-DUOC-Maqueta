import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssistanceregistryPage } from './assistanceregistry.page';

describe('AssistanceregistryPage', () => {
  let component: AssistanceregistryPage;
  let fixture: ComponentFixture<AssistanceregistryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceregistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
