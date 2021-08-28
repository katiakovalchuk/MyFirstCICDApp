import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  currentUser: any;
  isLoggedIn: boolean = false;
  form: any = {
    userName: null,
    email: null,
    age: null
  };

  constructor(private token: TokenStorageService, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.form = {
        ...this.form,
        email: this.currentUser.email
      }
    }
  }

  onSubmit(): void{
    this.profileService.updateProfile({ ...this.form }).subscribe();
    alert('Profile data has been updated successfully!');
  }
}
