import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

type Game = {
  title: string,
  price: string,
  description: string
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const BASE_URL = 'http://localhost:8080/api/';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  title: string = 'Games';
  searchText: string = '';
  isSearchMade: boolean = false;
  games: Array<Game> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${BASE_URL}games`, httpOptions)
      .subscribe(games=> {
        this.games = games as Game[];
      });
  }

  addSearchResults(){
    this.isSearchMade = true;
  }
  addToLibrary(){
    alert('Added to library');
  }
}
