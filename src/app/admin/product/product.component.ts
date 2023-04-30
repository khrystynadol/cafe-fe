import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-custom-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    const url = 'http://localhost:5000/product/getAll';
    const headers = new HttpHeaders({
      'Authorization': `Basic ${this.token}`
    });
    this.http.get<any[]>(url, { headers }).subscribe(data => {
      this.products = data;
      console.log(data);
    }, error => {
      console.error('Error fetching products:', error);
    });
  }

}

