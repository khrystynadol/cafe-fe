import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {IsActiveMatchOptions, Router, UrlTree} from '@angular/router';
import { ClientNavigationComponent } from './client-navigation.component';

describe('ClientNavigationComponent', () => {
  let component: ClientNavigationComponent;
  let fixture: ComponentFixture<ClientNavigationComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientNavigationComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientNavigationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for isColoredPage when URL contains "/profile"', () => {
    spyOnProperty(router, 'url').and.returnValue('/client/profile');
    const result = component.isColoredPage();
    expect(result).toBe(true);
  });

  it('should return true for isColoredPage when URL contains "/menu"', () => {
    spyOnProperty(router, 'url').and.returnValue('/client/menu');
    const result = component.isColoredPage();
    expect(result).toBe(true);
  });

  it('should return false for isColoredPage when URL does not contain "/profile" or "/menu"', () => {
    spyOn(router, 'createUrlTree').and.returnValue(router.parseUrl('/client'));
    spyOn(router, 'isActive').and.returnValue(false);

    const result = component.isColoredPage();
    expect(result).toBe(false);
  });

  it('should return true for isLoggedIn when email and password are set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues('test@example.com', 'password');

    const result = component.isLoggedIn();
    expect(result).toBe(true);
  });

  it('should return false for isLoggedIn when email and pass are not set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, null);
    const result = component.isLoggedIn();

    expect(result).toBe(false);
  });

  it('should return false for isLoggedIn when pass is not set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues(null, '123');
    const result = component.isLoggedIn();

    expect(result).toBe(false);
  });

  it('should return false for isLoggedIn when email is not set in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValues('john@sample.com', null);
    const result = component.isLoggedIn();

    expect(result).toBe(false);
  });
});
