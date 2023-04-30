import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-navigation',
  templateUrl: './client-navigation.component.html',
  styleUrls: ['./client-navigation.component.scss']
})
export class ClientNavigationComponent {
  constructor(private router: Router) {}
  isColoredPage(): boolean {
    const url = this.router.url;
    return url.includes('/profile') || url.includes('/menu');
  }

}
