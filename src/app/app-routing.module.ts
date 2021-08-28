import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {GamesComponent} from "./components/games/games.component";
import {LibraryComponent} from "./components/library/library.component";
import {FriendsComponent} from "./components/friends/friends.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'games', component: GamesComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'friends', component: FriendsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
