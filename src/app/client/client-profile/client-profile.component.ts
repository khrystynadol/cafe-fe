import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";

interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})

export class ClientProfileComponent implements OnInit {
  SERVER_ADDRESS = 'http://127.0.0.1:5000';
  token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
  profile: UserProfile | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    // Set up Basic Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.token}`
    });

    // Fetch user's profile data from the server
    this.http.get<UserProfile>(this.SERVER_ADDRESS + '/user/' + localStorage.getItem('id'), { headers }).subscribe(
      profile => {
        this.profile = profile;
      },
      error => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }
}

