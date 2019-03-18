import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFooterActiveComponent } from './card-footer-active.component';

describe('CardFooterActiveComponent', () => {
  let component: CardFooterActiveComponent;
  let fixture: ComponentFixture<CardFooterActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFooterActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFooterActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
