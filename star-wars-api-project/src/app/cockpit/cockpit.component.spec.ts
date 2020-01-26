import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CockpitComponent } from './cockpit.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CockpitComponent', () => {
  let component: CockpitComponent;
  let fixture: ComponentFixture<CockpitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ CockpitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CockpitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set Mass VS Crew as fightMode', () => {
    component.onSelectFightMode('Mass VS Crew')
    expect(component.massVsCrew).toEqual(true);
    expect(component.heightVsLength).toEqual(false);

  });

  it('should set Height VS length as fightMode', () => {
    component.onSelectFightMode('Height VS length')
    expect(component.heightVsLength).toEqual(true);
    expect(component.massVsCrew).toEqual(false);
  });

  // it('should set Height VS length as fightMode', () => {
  //   component.onGetData()
  //   expect(component.heightVsLength).toEqual(true);
  //   expect(component.massVsCrew).toEqual(false);
  // });



});
