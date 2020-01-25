import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, forkJoin} from 'rxjs';

// import * as q from ''

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getData(): Observable<any[]> {
    const randomPeoplePage = Math.floor(Math.random() * 9) + 1;
    const peopleUrl = `https://swapi.co/api/people/?page=${randomPeoplePage}`;

    const randomStarshipsPage = Math.floor(Math.random() * 4) + 1;
    const starshipsUrl = `https://swapi.co/api/starships/?page=${randomStarshipsPage}`;

    const peopleProm = this.http.get(peopleUrl);
    const starshipProm = this.http.get(starshipsUrl);

    return forkJoin([peopleProm, starshipProm])

  }
}
