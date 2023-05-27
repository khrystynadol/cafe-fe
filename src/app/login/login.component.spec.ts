import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with empty email and password', () => {
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
  });

  it('should update email property when onUpdateEmail is called', () => {
    const email = 'test@example.com';
    const event = { target: { value: email } };
    component.onUpdateEmail(event);
    expect(component.email).toEqual(email);
  });

  it('should update password property when onUpdatePassword is called', () => {
    const password = 'test123';
    const event = { target: { value: password } };
    component.onUpdatePassword(event);
    expect(component.password).toEqual(password);
  });

  it('should handle successful login response and navigate to client page for client role', () => {
    const response = { id: '123', role: 'client' };
    const navigateSpy = spyOn(component.router, 'navigate');
    const postData = { email: 'test@example.com', password: 'test123' };

    component.email = postData.email;
    component.password = postData.password;
    component.onSubmit();

    const req = httpMock.expectOne('http://127.0.0.1:5000/user/login');
    expect(req.request.method).toBe('POST');
    req.flush(response);

    expect(localStorage.getItem('email')).toEqual(postData.email);
    expect(localStorage.getItem('password')).toEqual(postData.password);
    expect(localStorage.getItem('id')).toEqual(response.id);
    expect(navigateSpy).toHaveBeenCalledWith(['client']);
  });

  it('should handle successful login response and navigate to admin page for manager role', () => {
    const response = { id: '123', role: 'manager' };
    const navigateSpy = spyOn(component.router, 'navigate');
    const postData = { email: 'test@example.com', password: 'test123' };

    component.email = postData.email;
    component.password = postData.password;
    component.onSubmit();

    const req = httpMock.expectOne('http://127.0.0.1:5000/user/login');
    expect(req.request.method).toBe('POST');
    req.flush(response);

    expect(localStorage.getItem('email')).toEqual(postData.email);
    expect(localStorage.getItem('password')).toEqual(postData.password);
    expect(localStorage.getItem('id')).toEqual(response.id);
    expect(navigateSpy).toHaveBeenCalledWith(['admin']);
  });

  it('should handle login error response with status 412', () => {
    const errorMessage = 'Email or password is incorrect';
    const errorStatus = 412;
    const errorResponse = {
      status: errorStatus,
      statusText: errorMessage,
      error: null,
    };

    component.onSubmit();

    const request = httpMock.expectOne('http://127.0.0.1:5000/user/login');
    expect(request.request.method).toBe('POST');
    request.flush(null, errorResponse);

    expect(component.errorMessage).toBe(errorMessage);
  });


  it('should handle login error response with status other than 412', () => {
    const errorMessage = 'Login failed for some unknown reason';
    const errorStatus = 500;
    const errorResponse = {
      status: errorStatus,
      statusText: errorMessage,
      error: null,
    };

    component.onSubmit();

    const request = httpMock.expectOne('http://127.0.0.1:5000/user/login');
    expect(request.request.method).toBe('POST');
    request.flush(null, errorResponse);

    expect(component.errorMessage).toBe(errorMessage);
  });
});
