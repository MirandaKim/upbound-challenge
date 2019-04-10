import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWorkflowComponent } from './card-workflow.component';

describe('CardWorkflowComponent', () => {
  let component: CardWorkflowComponent;
  let fixture: ComponentFixture<CardWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
