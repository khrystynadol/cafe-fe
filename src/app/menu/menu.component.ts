import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

const SERVER_ADDRESS = 'http://127.0.0.1:5000';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {
  itemAv: string;
  token: string;
  menuItems: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.token = btoa(`${localStorage.getItem('email')}:${localStorage.getItem('password')}`);
    this.fetchMenuItems();
  }

  fetchMenuItems() {
    const url = SERVER_ADDRESS + '/menu/getAll';
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Basic ${this.token}`
    };
    this.http.get<any[]>(url, {headers}).subscribe(data => {
      this.menuItems = data;
      this.renderMenuItems();
    }, error => {
      console.error('Error fetching menu items:', error);
    });
  }

  renderMenuItems() {
    const menuContainer = this.elementRef.nativeElement.querySelector('.menu-container');
    let numItems = 0;
    let grid: any = null;

    this.menuItems.forEach(item => {
      const menuItem = this.renderer.createElement('div');
      this.renderer.setAttribute(menuItem, 'class', 'menu-member hover-effect');

      const menuImage = this.renderer.createElement('img');
      // this.renderer.setAttribute(menuImage, 'src', 'content');
      const menuContent = this.renderer.createElement('div');
      this.renderer.setAttribute(menuContent, 'class', 'content');

      const itemName = this.renderer.createElement('h4');
      this.renderer.setAttribute(itemName, 'class', 'h5');

      const itemDescription = this.renderer.createElement('p');
      this.renderer.setAttribute(itemDescription, 'class', 'simple-text h5');

      const itemPrice = this.renderer.createElement('p');
      this.renderer.setAttribute(itemPrice, 'class', 'h5');
      if (!!item.availability) {
        this.itemAv = "yes";
      }
      else {
        this.itemAv = "no";
      }
      itemPrice.textContent = `Price: ${item.price}₴  |  Weight: ${item.weight}g  |  Available: ${this.itemAv}`;

      menuImage.src = '';

      this.http.get<any>(`${SERVER_ADDRESS}/image/${item.id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Basic ${this.token}`
        }
      }).subscribe(imageData => {
        console.log(imageData);
        // const objectUrl = URL.createObjectURL(imageData);
        // const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        this.renderer.setAttribute(menuImage, 'src', imageData.name);
      }, error => {
        console.error(`Error fetching image data for menu item '${item.name}':`, error);
      });

      itemName.textContent = item.name;
      itemDescription.textContent = item.description;

      menuItem.appendChild(menuImage);
      menuContent.appendChild(itemName);
      menuContent.appendChild(itemDescription);
      if (!!localStorage.getItem('email')) {
        menuContent.appendChild(itemPrice);
      }
      menuItem.appendChild(menuContent);

      if ((numItems + 1) % 4 === 1) {
        const gridIndex = Math.floor(numItems / 4);

        if (!grid) {
          grid = document.createElement('div');
          grid.classList.add('four-col-grid');
        }

        menuContainer.appendChild(grid);
      }

      grid.appendChild(menuItem);
      numItems++;
    });

    if (grid) {
      menuContainer.appendChild(grid);
    }
  }
}
