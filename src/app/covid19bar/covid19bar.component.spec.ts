import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19barComponent } from './covid19bar.component';

describe('Covid19barComponent', () => {
  let component: Covid19barComponent;
  let fixture: ComponentFixture<Covid19barComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19barComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Covid19barComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
