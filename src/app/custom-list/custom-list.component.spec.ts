import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomListComponent } from './custom-list.component';
import {SidebarComponent} from "../admin/sidebar/sidebar.component";
import {NavigationComponent} from "../admin/navigation/navigation.component";

describe('CustomListComponent', () => {
  let component: CustomListComponent;
  let fixture: ComponentFixture<CustomListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CustomListComponent, SidebarComponent, NavigationComponent]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();

    const request = httpMock.expectOne('http://localhost:5000/custom/getAll');
    expect(request.request.method).toBe('GET');
    request.flush([]);

    httpMock.verify();
  });

  it('should fetch and render the custom list items', () => {
    const mockCustoms = [
      { name: 'Custom 1', description: 'Description 1', price: 10 },
      { name: 'Custom 2', description: 'Description 2', price: 20 }
    ];

    const request = httpMock.expectOne('http://localhost:5000/custom/getAll');
    expect(request.request.method).toBe('GET');
    request.flush(mockCustoms);

    fixture.detectChanges(); // Update the template

    expect(component.customs).toEqual(mockCustoms);

    const nameElements = fixture.nativeElement.querySelectorAll('.sales-details .topic');
    expect(nameElements.length).toBe(3);
    expect(nameElements[0].textContent).toBe('Name');

    const customNameElements = fixture.nativeElement.querySelectorAll('.sales-details .details li');
    expect(customNameElements.length).toBe(6);
    expect(customNameElements[0].textContent).toBe('Custom 1');
    expect(customNameElements[1].textContent).toBe('Custom 2');

    httpMock.verify();
  });

  it('should handle error when fetching customs', () => {
    const errorMessage = 'Failed to fetch customs.';

    const request = httpMock.match('http://localhost:5000/custom/getAll');
    expect(request.length).toBe(1);
    request[0].flush(null, { status: 500, statusText: errorMessage }); // Simulate an error response

    expect(component.customs).toEqual([]);

    // let consoleErrorSpy = spyOn(console, 'error');
    // expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching customs:', jasmine.any(Error));
  });

  it('should render the "No customs found" message when no customs are available', () => {
    component.customs = [];
    fixture.detectChanges();

    const noCustomsElement = fixture.nativeElement.querySelector('.sales-boxes .title');
    expect(noCustomsElement.textContent).toContain('Custom list');

    const url = 'http://localhost:5000/custom/getAll';

    const req = httpMock.expectOne(url);
    expect(req.request.method).toEqual('GET');

    const noCustomsMessageElement = fixture.nativeElement.querySelector('.sales-boxes .dark-text li');
    expect(noCustomsMessageElement.textContent).toContain('No customs found.');
  });

});
