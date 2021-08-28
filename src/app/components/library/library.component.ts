import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";
type Game = {
  title: string,
  price: string,
  description: string
}

const BASE_URL = 'http://localhost:8080/api/';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  games: Array<Game> = [];
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient,  private token: TokenStorageService) { }

  ngOnInit(): void {
    if (this.token.getUser()){
      this.isLoggedIn = true;
    }
    const token = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    this.http.get(`${BASE_URL}userGames`, httpOptions)
      .subscribe(games => {
        this.games = games as Game[];
      });
  }
  download(){
    alert('Game has been downloaded successfully!');
  }
  share(){
    alert('Game has been shared successfully!');
  }
}
