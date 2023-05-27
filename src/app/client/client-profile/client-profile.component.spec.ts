import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientProfileComponent } from './client-profile.component';
import {ClientNavigationComponent} from "../client-navigation/client-navigation.component";

describe('ClientProfileComponent', () => {
  let component: ClientProfileComponent;
  let fixture: ComponentFixture<ClientProfileComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileComponent, ClientNavigationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProfileComponent);
    component = fixture.componentInstance;
    localStorage.setItem('id', '5');
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the client profile component', () => {
    expect(component).toBeTruthy();

    const request = httpMock.match(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`);
    expect(request[0].request.method).toBe('GET');
    expect(request.length).toBe(1);
    // request.flush(mockProfile);
  });

  it('should fetch and display user profile data', () => {
    const mockProfile = {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890'
    };

    const request = httpMock.match(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`);
    expect(request.length).toBe(1);
    expect(request[0].request.method).toBe('GET');
    request[0].flush(mockProfile);

    fixture.detectChanges(); // Trigger change detection to update the view

    expect(component.profile).toEqual(mockProfile);

    const nameElement = fixture.nativeElement.querySelector('#name');
    expect(nameElement.textContent).toBe(mockProfile.name);

    const surnameElement = fixture.nativeElement.querySelector('#surname');
    expect(surnameElement.textContent).toBe(mockProfile.surname);

    const emailElement = fixture.nativeElement.querySelector('#email');
    expect(emailElement.textContent).toBe(mockProfile.email);

    const phoneElement = fixture.nativeElement.querySelector('#phone');
    expect(phoneElement.textContent).toBe(mockProfile.phone);
  });

  it('should handle error when fetching user profile data', () => {
    const errorMessage = 'Failed to fetch user profile.';
    const request = httpMock.expectOne(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`);
    // request.error(new ErrorEvent(errorMessage));

    expect(component.profile).toBeNull();
    // expect(console.error).toHaveBeenCalledWith('Failed to fetch user profile:', new Error(errorMessage));
  });

  it('should log out and navigate to the home page', () => {
    spyOn(localStorage, 'removeItem');
    const request = httpMock.match(`http://127.0.0.1:5000/user/${localStorage.getItem('id')}`);
    expect(request.length).toBe(1);
    component.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('id');
    expect(localStorage.removeItem).toHaveBeenCalledWith('email');
    expect(localStorage.removeItem).toHaveBeenCalledWith('password');
  });
});
