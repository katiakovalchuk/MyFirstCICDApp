import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ProfileService } from '../../services/profile.service';

enum KEYS{
  TOKEN_KEY = 'auth-token',
  USER_KEY = 'auth-user',
}

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
    const { userName, age } = this.form;
    console.log({ ...this.form });
    console.log(userName);
    console.log(age);
    this.profileService.updateProfile({ ...this.form }).subscribe();
  }

  // onSubmit(): void {
  //   const { email, password } = this.form;
  //
  //   this.authService.login({email, password}).subscribe(
  //     data => {
  //       this.token.saveToken(data.token);
  //       this.token.saveUser(data);
  //
  //       // this.isLoginFailed = false;
  //       // this.isLoggedIn = true;
  //       // this.reloadPage();
  //     },
  //     // err => {
  //     //   this.errorMessage = err.error.message;
  //     //   this.isLoginFailed = true;
  //     // }
  //   );
  // }
}
