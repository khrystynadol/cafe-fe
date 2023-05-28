import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  users: any[] = [];
  socket: Socket;
  constructor() { }

  ngOnInit(): void {
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', () => {
      this.socket.emit('get_all_users');
    });
    this.socket.on('all_users', (users: any[]) => {
      this.users = users;
      console.log(users);
    });
  }
}

//
//
// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Socket } from 'ngx-socket-io';
//
// @Component({
//   selector: 'app-admin-users',
//   templateUrl: './admin-users.component.html',
//   styleUrls: ['./admin-users.component.scss']
// })
// export class AdminUsersComponent implements OnInit {
//   users: any[] = [];
//
//   constructor(private http: HttpClient, private socket: Socket) { }
//
//   ngOnInit(): void {
//
//     console.log('Before subscribing');
//     this.socket.fromEvent<any[]>('all_users').subscribe((data: any[]) => {
//       console.log('Inside subscribing');
//       this.users = data;
//       console.log('Received users:', this.users);
//     });
//     console.log('After subscribing');
//
//     // this.socket.emit('get_all_user');
//     // console.log('Before subscribing');
//     // this.socket.emit('get_all_users', (data: any[]) => {
//     //   console.log('Inside subscribing');
//     //   this.users = data;
//     //   console.log('Received users:', this.users);
//     // });
//     // console.log('After subscribing');
//     // this.socket.fromEvent('get_all_users').subscribe((data: any) => {
//     //   console.log('Inside subscribing');
//     //   console.log('Received data:', data);
//     // });
//
//
//     // this.socket.emit('get_all_user');
//     //
//     // this.socket.on('all_users', (data: any[]) => {
//     //   this.users = data;
//     //   console.log('Received users:', this.users);
//     // });
//     //
//     // this.socket.on('error', (error: any) => {
//     //   console.error('Error fetching users:', error);
//     // });
//   }
//
// }



// import { Component } from '@angular/core';
// import {HttpClient, HttpHeaders} from "@angular/common/http";
//
// @Component({
//   selector: 'app-admin-users',
//   templateUrl: './admin-users.component.html',
//   styleUrls: ['./admin-users.component.scss']
// })
// export class AdminUsersComponent {
//   users: any[] = [];
//   token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit(): void {
//     this.fetchUsers();
//   }
//
//   fetchUsers() {
//     const url = 'http://localhost:5000/user/getAll';
//     const headers = new HttpHeaders({
//       'Authorization': `Basic ${this.token}`
//     });
//     this.http.get<any[]>(url, { headers }).subscribe(data => {
//       this.users = data;
//       console.log(data);
//     }, error => {
//       console.error('Error fetching products:', error);
//     });
//   }
// }
