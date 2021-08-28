import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

const BASE_URL = 'http://localhost:8080/api/';

type User = {
  userName: string,
  age: string,
}

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  constructor(private http: HttpClient, private token: TokenStorageService) { }

  updateProfile(user: User): Observable<any> {
    const { userName, age } = user;
    const params = new HttpParams().set('userName', user.userName).set('age', user.age);
    const token = this.token.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.put(`${BASE_URL}updateUserProfile?${params}`, {
      userName,
      age,
    }, httpOptions);
  }
}
