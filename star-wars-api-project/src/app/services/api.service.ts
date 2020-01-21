import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  getData() {
    const randomPeoplePage = Math.floor(Math.random() * 9) +1;
    const randomStarshipsPage = Math.floor(Math.random() * 4) +1;
    const peopleUrl = `https://swapi.co/api/people/?page=${randomPeoplePage}`;
    const starshipsUrl = `https://swapi.co/api/starships/?page=${randomStarshipsPage}`;

    return forkJoin([this.http.get(peopleUrl), this.http.get(starshipsUrl)]);
  }
}
