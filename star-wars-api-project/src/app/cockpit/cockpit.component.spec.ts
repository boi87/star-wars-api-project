import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CockpitComponent} from './cockpit.component';
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
      declarations: [CockpitComponent]
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

  it('onSelectFightMode() -> should set Mass VS Crew as fightMode', () => {
    component.onSelectFightMode('Mass VS Crew')
    expect(component.massVsCrew).toEqual(true);
    expect(component.heightVsLength).toEqual(false);

  });

  it('onSelectFightMode() -> should set Height VS length as fightMode', () => {
    component.onSelectFightMode('Height VS length')
    expect(component.heightVsLength).toEqual(true);
    expect(component.massVsCrew).toEqual(false);
  });

  it('onNewGame() -> should reset game stats and reinitiate variables', () => {
    component.onNewGame();
    expect(component.p1Score).toEqual(0);
    expect(component.p2Score).toEqual(0);

    expect(component.fightModeSelected).toEqual(null);

    expect(component.heightVsLength).toEqual(false);
    expect(component.massVsCrew).toEqual(false);

    expect(component.p1Wins).toEqual(false);
    expect(component.p2Wins).toEqual(false);

    expect(component.person).toEqual(null);
    expect(component.starship).toEqual(null);
  });

  it('onGetData() -> should have called onFight', () => {
    spyOn(component, 'onFight');

    component.onGetData();

    setTimeout(() => {
      expect(component.onFight).toHaveBeenCalled();
    });
  });

  it('onFight with dummy data', () => {

  });
});
