import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.scss']
})
export class CustomListComponent implements OnInit {
  customs: any[] = [];
  socket: Socket;
  token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);

  constructor() { }

  ngOnInit(): void {
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', () => {
      this.socket.emit('get_all_customs');
    });

    this.socket.on('all_customs', (customs: any[]) => {
      this.customs = customs;
      console.log(customs);
    });
  }
}

// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
//
// @Component({
//   selector: 'app-custom-list',
//   templateUrl: './custom-list.component.html',
//   styleUrls: ['./custom-list.component.scss']
// })
// export class CustomListComponent implements OnInit {
//   customs: any[] = [];
//   token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
//
//   constructor(private http: HttpClient) { }
//
//   ngOnInit(): void {
//     this.fetchCustoms();
//   }
//
//   fetchCustoms() {
//     const url = 'http://localhost:5000/custom/getAll';
//     const headers = new HttpHeaders({
//       'Authorization': `Basic ${this.token}`
//     });
//     this.http.get<any[]>(url, { headers }).subscribe(data => {
//       this.customs = data;
//       console.log(data);
//     }, error => {
//       console.error('Error fetching customs:', error);
//     });
//   }
// }
