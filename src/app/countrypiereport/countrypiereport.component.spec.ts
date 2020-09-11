import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrypiereportComponent } from './countrypiereport.component';

describe('CountrypiereportComponent', () => {
  let component: CountrypiereportComponent;
  let fixture: ComponentFixture<CountrypiereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrypiereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrypiereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
