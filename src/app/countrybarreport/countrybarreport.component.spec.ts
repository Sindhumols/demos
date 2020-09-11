import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrybarreportComponent } from './countrybarreport.component';

describe('CountrybarreportComponent', () => {
  let component: CountrybarreportComponent;
  let fixture: ComponentFixture<CountrybarreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrybarreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrybarreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
