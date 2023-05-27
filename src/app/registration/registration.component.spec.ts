import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RegistrationComponent } from './registration.component';
import {of, Subscription, throwError} from 'rxjs';
import { HttpClient } from "@angular/common/http";

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [RegistrationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the registration component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component', () => {
    expect(component.submitted).toBeFalse();
    expect(component.errorMessage).toBeUndefined();
    expect(component.user.surname).toBe('');
  });

  it('should submit the form and make an HTTP post request', () => {
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(
      of(new Subscription())
    );

    const form: NgForm = {
      invalid: false,
      value: {
        name: 'John',
        surname: 'Doe',
        phone: '0962250511',
        email: 'john@example.com',
        password: 'pass123'
      },
      resetForm: () => {}
    } as NgForm;

    const event = new Event('submit');
    component.onAddUser(form, event);

    expect(component.submitted).toBeTrue();
    expect(httpSpy).toHaveBeenCalledOnceWith(
      'http://127.0.0.1:5000/user',
      {
        name: 'John',
        surname: 'Doe',
        phone: '0962250511',
        email: 'john@example.com',
        password: 'pass123'
      },
      { headers: jasmine.any(Object) }
    );
  });

  it('should handle successful registration response', () => {
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(
      of({ id: '6' }) // Simulate a successful response with an ID value
    );

    const localStorageSpy = spyOn(localStorage, 'setItem');

    const form: NgForm = {
      invalid: false,
      value: {
        name: 'John',
        surname: 'Doe',
        phone: '0962250511',
        email: 'user1@gmail.com',
        password: 'pass123'
      },
      resetForm: () => {}
    } as NgForm;

    const event = new Event('submit');
    component.onAddUser(form, event);

    expect(localStorageSpy).toHaveBeenCalledTimes(3);
    expect(localStorageSpy).toHaveBeenCalledWith('email', 'user1@gmail.com');
    expect(localStorageSpy).toHaveBeenCalledWith('password', 'pass123');
    expect(localStorageSpy).toHaveBeenCalledWith('id', '6');
    expect(httpSpy).toHaveBeenCalled();
  });


  it('should handle 409 conflict error response', () => {
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(
      throwError({ status: 409 })
    );

    const form: NgForm = {
      invalid: false,
      value: {
        name: 'John',
        surname: 'Doe',
        phone: '0962250512',
        email: 'user2@gmail.com',
        password: 'password'
      },
      resetForm: () => {}
    } as NgForm;

    const event = new Event('submit');
    component.onAddUser(form, event);

    expect(component.errorMessage).toBe('Email or phone number is not unique');
  });


  it('should handle 400 validation error response', () => {
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(
      throwError({ status: 400 })
    );

    const form: NgForm = {
      invalid: false,
      value: {
        name: 'John',
        surname: 'Doe',
        phone: '1234567890',
        email: 'john@example.com',
        password: 'pas'
      },
      resetForm: () => {}
    } as NgForm;

    const event = new Event('submit');
    component.onAddUser(form, event);

    expect(component.errorMessage).toBe('Validation error');
  });

  it('should handle unknown error response', () => {
    const httpSpy = spyOn(TestBed.inject(HttpClient), 'post').and.returnValue(
      throwError({ status: 405 })
    );

    const form: NgForm = {
      invalid: false,
      value: {
        name: 'John',
        surname: 'Doe',
        phone: '1234567890',
        email: 'john@example.com',
        password: 'password'
      },
      resetForm: () => {}
    } as NgForm;

    const event = new Event('submit');
    component.onAddUser(form, event);

    expect(component.errorMessage).toBe('Registration failed for some unknown reason');
  });

  // Add more test cases for form validation, error handling, etc.
});
