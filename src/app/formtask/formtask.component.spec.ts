import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtaskComponent } from './formtask.component';

describe('FormtaskComponent', () => {
  let component: FormtaskComponent;
  let fixture: ComponentFixture<FormtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
