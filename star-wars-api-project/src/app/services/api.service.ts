import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getPeople() {
    const randomPeoplePage = Math.floor(Math.random() * 9) +1;

    const peopleUrl = `https://swapi.co/api/people/?page=${randomPeoplePage}`;


    return this.http.get(peopleUrl);
  }

  getStarship() {
    const randomStarshipsPage = Math.floor(Math.random() * 4) +1;

    const starshipsUrl = `https://swapi.co/api/starships/?page=${randomStarshipsPage}`;

    return this.http.get(starshipsUrl);
  }
}
