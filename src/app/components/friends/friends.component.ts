import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../services/token-storage.service";

const BASE_URL = 'http://localhost:8080/api/';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})

export class FriendsComponent implements OnInit {
  title: string = 'Friends';
  friendsArray: any = [];
  searchedFriendsArray: any = [];
  searchText: string = '';
  isSearchMade: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private token: TokenStorageService) { }

  ngOnInit(): void {
    // this.currentUser = this.token.getUser();
    // if (this.token.getToken()) {
    //   this.isLoggedIn = true;
    //   this.form = {
    //     ...this.form,
    //     email: this.currentUser.email
    //   }
    // }
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
    this.http.get(`${BASE_URL}user/getFriends`, httpOptions)
      .subscribe(friends => {
        this.friendsArray = friends;
      });
    this.http.get(`${BASE_URL}user/searchFriends`, httpOptions)
      .subscribe(friends => {
        this.searchedFriendsArray = friends;
      })
  }
  addSearchResults(){
    this.isSearchMade = true;
  }
  addFriend(){
    alert('Friend has been added!');
  }
  removeFriend(){
    alert('Friend has been removed!');
  }
}
