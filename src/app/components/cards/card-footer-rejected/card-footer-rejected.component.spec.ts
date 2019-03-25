import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFooterRejectedComponent } from './card-footer-rejected.component';

describe('CardFooterRejectedComponent', () => {
  let component: CardFooterRejectedComponent;
  let fixture: ComponentFixture<CardFooterRejectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardFooterRejectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFooterRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
