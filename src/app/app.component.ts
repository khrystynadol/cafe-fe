import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cafe-spa';

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('id');
  }

  get isClient(): boolean {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.role === 'client';
  }

  get isAdmin(): boolean {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData && userData.role === 'admin';
  }

}
