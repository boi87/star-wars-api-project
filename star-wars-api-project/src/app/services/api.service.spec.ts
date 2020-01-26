import {flush, getTestBed, TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {forkJoin, Observable} from 'rxjs';
import {Person} from '../models/models';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [ApiService]
    });

    injector = getTestBed();
    service = injector.get(ApiService);
    httpMock = injector.get(HttpTestingController);

  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });


  it('should return an Observable', () => {
    const randomPeoplePage = Math.floor(Math.random() * 9) + 1;
    const randomStarshipsPage = Math.floor(Math.random() * 4) + 1;


    const dummyData = [
      {
        count: 87,
        next: `https://swapi.co/api/people/?page=${randomPeoplePage + 1}` || null,
        previous: `https://swapi.co/api/people/?page=${randomPeoplePage - 1}` || null,
        results: new Array(87)
      },
      {
        count: 37,
        next: `https://swapi.co/api/starships/?page=${randomStarshipsPage + 1}` || null,
        previous: `https://swapi.co/api/starships/?page=${randomStarshipsPage - 1}` || null,
        results: new Array(37)
      }
    ];

    service.getData().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyData);

      const peopleReq = httpMock.expectOne(`https://swapi.co/api/people/?page=${randomPeoplePage}`);
      const starshipReq = httpMock.expectOne(`https://swapi.co/api/starships/?page=${randomStarshipsPage}`);
      forkJoin([peopleReq, starshipReq]).subscribe(e => {
        expect(peopleReq.request.method).toBe('GET');
        // expect(e[1].request.method).toBe('GET');
        console.log(e);

      })
      peopleReq.flush(dummyData[0]);
      starshipReq.flush(dummyData[1]);


      expect(peopleReq.request.method).toBe('GET'),
        expect(starshipReq.request.method).toBe('GET')


      peopleReq.flush(dummyData[0]);
      starshipReq.flush(dummyData[1]);
    });


  });

});

