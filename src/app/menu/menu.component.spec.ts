import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ElementRef, Renderer2 } from '@angular/core';

import { MenuComponent } from './menu.component';
import { ClientNavigationComponent } from "../client/client-navigation/client-navigation.component";
import {ChunkPipe} from "./chunk.pipe";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MenuComponent, ClientNavigationComponent, ChunkPipe],
      providers: [
        DomSanitizer,
        { provide: ElementRef, useValue: document.createElement('div') },
        { provide: Renderer2, useClass: Renderer2 },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch menu items on component initialization', () => {
    const mockMenuItems = [
      { id: 1, name: 'Item 1', description: 'Description 1', price: 10, weight: 200, availability: true },
      { id: 2, name: 'Item 2', description: 'Description 2', price: 15, weight: 300, availability: false }
    ];
    const mockImageResponse = { name: 'mock_image.jpg' };

    component.ngOnInit();

    const menuItemsRequests = httpMock.match('http://127.0.0.1:5000/menu/getAll');
    expect(menuItemsRequests.length).toBe(2);
    menuItemsRequests[0].flush(mockMenuItems);

    const imageRequests = httpMock.match((req) => req.url.startsWith('http://127.0.0.1:5000/image'));
    expect(imageRequests.length).toBe(mockMenuItems.length);

    for (let i = 0; i < imageRequests.length; i++) {
      const menuItemId = mockMenuItems[i].id;
      imageRequests[i].flush(mockImageResponse);
      expect(imageRequests[i].request.url).toBe(`http://127.0.0.1:5000/image/${menuItemId}`);
    }

    expect(component.menuItems).toEqual(mockMenuItems);
    // Additional expectations for rendering menu items
  });

  it('should handle error when fetching menu items', () => {
    spyOn(console, 'error'); // Spy on console.error to prevent error logs from cluttering the test output

    const errorMessage = 'Error fetching menu items';
    const errorStatus = 500;

    component.ngOnInit();

    const requests = httpMock.match('http://127.0.0.1:5000/menu/getAll');
    expect(requests.length).toBe(2);

    // for (const request of requests) {
    //   request.flush(null, { status: errorStatus, statusText: errorMessage });
    // }

    expect(component.menuItems).toEqual([]);
    // const expectedErrorMessage = `Error fetching menu items: Http failure response for http://127.0.0.1:5000/menu/getAll: ${errorStatus} ${errorMessage}`;
    // expect(console.error).toHaveBeenCalledWith(expectedErrorMessage);
    httpMock.verify();
  });

  it('should render menu items', () => {
    const mockMenuItems = [
      { id: 1, name: 'Item 1', description: 'Description 1', price: 10, weight: 200, availability: true },
      { id: 2, name: 'Item 2', description: 'Description 2', price: 15, weight: 300, availability: false }
    ];

    const url = 'http://127.0.0.1:5000/menu/getAll';
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockMenuItems);

    fixture.detectChanges();

    const menuContainer = fixture.nativeElement.querySelector('.menu-container');
    expect(menuContainer).not.toBeNull();

    const menuItemElements = menuContainer.querySelectorAll('.menu-member');
    expect(menuItemElements.length).toBe(mockMenuItems.length);

    for (let i = 0; i < mockMenuItems.length; i++) {
      const menuItem = mockMenuItems[i];
      const menuItemElement = menuItemElements[i];

      const itemNameElement = menuItemElement.querySelector(`#menu > div > div.four-col-grid > div:nth-child(${i + 1}) > div > h4`);
      const itemDescriptionElement = menuItemElement.querySelector(`#menu > div > div.four-col-grid > div:nth-child(${i + 1}) > div > p.simple-text.h5`);
      const itemPWAElement = menuItemElement.querySelector(`#menu > div > div.four-col-grid > div:nth-child(${i + 1}) > div > p:nth-child(3)`);

      expect(itemNameElement).not.toBeNull();
      expect(itemDescriptionElement).not.toBeNull();
      expect(itemPWAElement).not.toBeNull();

      const itemName = itemNameElement.textContent;
      const itemDescription = itemDescriptionElement.textContent;
      const itemPWA = itemPWAElement.textContent;

      expect(itemName).toBe(menuItem.name);
      expect(itemDescription).toBe(menuItem.description);
      expect(itemPWA).toContain(`Price: ${menuItem.price}₴  |  Weight: ${menuItem.weight}g  |  Available: ${menuItem.availability ? 'yes' : 'no'}`);

      const imageReq = httpMock.expectOne(`http://127.0.0.1:5000/image/${menuItem.id}`);
      expect(imageReq.request.method).toEqual('GET');
      imageReq.flush({ name: 'mock_image_url' });
    }
  });

  it('should initialize menuItems and token properties in ngOnInit', () => {
    const mockMenuItems = [
      { id: 1, name: 'Item 1', description: 'Description 1', price: 10, weight: 200, availability: true },
      { id: 2, name: 'Item 2', description: 'Description 2', price: 15, weight: 300, availability: false }
    ];

    const url = 'http://127.0.0.1:5000/menu/getAll';
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');

    // const mockToken = 'mock-token';
    // spyOn(localStorage, 'getItem').and.returnValue(mockToken);
    spyOn(component, 'fetchMenuItems');

    component.ngOnInit();

    expect(component.menuItems).toEqual([]);
    // expect(component.token).toEqual(mockToken);
    expect(component.fetchMenuItems).toHaveBeenCalled();
  });


  it('should not initialize token property if localStorage token is null in ngOnInit', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(component, 'fetchMenuItems');

    const url = 'http://127.0.0.1:5000/menu/getAll';
    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');

    component.ngOnInit();
    // expect(component.token).toBeNull();
    // expect(component.fetchMenuItems).not.toHaveBeenCalled();
  });
});
