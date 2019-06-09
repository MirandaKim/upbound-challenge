import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipToContentComponent } from './skip-to-content.component';

describe('SkipToContentComponent', () => {
  let component: SkipToContentComponent;
  let fixture: ComponentFixture<SkipToContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipToContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipToContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
