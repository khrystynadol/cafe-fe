import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminUsersComponent } from './admin-users.component';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {NavigationComponent} from "../navigation/navigation.component";

describe('AdminUsersComponent', () => {
  let component: AdminUsersComponent;
  let fixture: ComponentFixture<AdminUsersComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUsersComponent, SidebarComponent, NavigationComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and populate users on initialization', () => {
    const usersResponse = [
      { name: 'John', surname: 'Doe', email: 'john@example.com', phone: '123456789', role: 'PersonStatus.manager' },
      { name: 'Jane', surname: 'Doe', email: 'jane@example.com', phone: '987654321', role: 'PersonStatus.client' }
    ];

    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:5000/user/getAll');
    expect(req.request.method).toBe('GET');

    req.flush(usersResponse);

    expect(component.users).toEqual(usersResponse);
    expect(component.users.length).toBe(2);
  });

  it('should handle error when fetching users', () => {
    component.ngOnInit();

    const req = httpMock.expectOne('http://localhost:5000/user/getAll');
    expect(req.request.method).toBe('GET');

    const errorMessage = 'Error fetching users';
    // req.error(new ErrorEvent('network error', { message: errorMessage }));

    // expect(console.error).toHaveBeenCalledWith('Error fetching products:', new Error(errorMessage));
    expect(component.users).toEqual([]);
  });

  it('should display user list if users exist', () => {
    component.users = [
      { name: 'John', surname: 'Doe', email: 'john@example.com', phone: '123456789', role: 'PersonStatus.manager' },
      { name: 'Jane', surname: 'Doe', email: 'jane@example.com', phone: '987654321', role: 'PersonStatus.client' }
    ];

    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:5000/user/getAll');
    expect(req.request.method).toBe('GET');

    const userListElement = fixture.nativeElement.querySelectorAll('.details.dark-text li');
    expect(userListElement.length).toBe(10); // 5 topics * 2 users

    expect(userListElement[0].textContent).toContain(component.users[0].name);
    expect(userListElement[1].textContent).toContain(component.users[1].name);
    // ... assert other user details
  });

  it('should display "No users found" message if users do not exist', () => {
    component.users = [];
    fixture.detectChanges();

    const req = httpMock.expectOne('http://localhost:5000/user/getAll');
    expect(req.request.method).toBe('GET');

    const noUsersElement = fixture.nativeElement.querySelector('.sales-boxes .title');
    expect(noUsersElement.textContent).toContain('User list');

    const noCustomsMessageElement = fixture.nativeElement.querySelector('.sales-boxes .dark-text li');
    expect(noCustomsMessageElement.textContent).toContain('No users found.');
  });
});
