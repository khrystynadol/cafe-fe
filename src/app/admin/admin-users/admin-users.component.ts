import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  users: any[] = [];
  token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    const url = 'http://localhost:5000/user/getAll';
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.token}`
    });
    this.http.get<any[]>(url, { headers }).subscribe(data => {
      this.users = data;
      console.log(data);
    }, error => {
      console.error('Error fetching products:', error);
    });
  }
}
