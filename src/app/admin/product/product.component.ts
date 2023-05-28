import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-custom-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  socket: Socket;
  token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);

  constructor() { }

  ngOnInit(): void {
    // const url = `http://localhost:5000/product/getAll?token=${this.token}`;
    this.socket = io('http://localhost:5000');
    this.socket.on('connect', () => {
      this.socket.emit('get_all_products');
    });

    this.socket.on('all_products', (products: any[]) => {
      this.products = products;
      console.log(products);
    });
  }

  // authenticateSocket() {
  //   this.socket.emit('authenticate', { token: this.token }, (authenticated: boolean) => {
  //     if (authenticated) {
  //       console.log('Socket authenticated');
  //       this.socket.emit('get_all_products');
  //     } else {
  //       console.error('Socket authentication failed');
  //     }
  //   });
  // }
}


// @Component({
//   selector: 'app-custom-list',
//   templateUrl: './product.component.html',
//   styleUrls: ['./product.component.scss']
// })
// export class ProductComponent implements OnInit {
//   products: any[] = [];
//   token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
//   constructor(private http: HttpClient) { }
//   ngOnInit(): void {
//     this.fetchProducts();
//   }
//
//   fetchProducts() {
//     const url = 'http://localhost:5000/product/getAll';
//     const headers = new HttpHeaders({
//       'Authorization': `Basic ${this.token}`
//     });
//     this.http.get<any[]>(url, { headers }).subscribe(data => {
//       this.products = data;
//       console.log(data);
//     }, error => {
//       console.error('Error fetching products:', error);
//     });
//   }
// }

