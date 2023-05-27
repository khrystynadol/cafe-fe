import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, FooterComponent],
      imports: [AppRoutingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [AppComponent, FooterComponent],
  //     imports: [AppRoutingModule]
  //   }).compileComponents();
  //
  //   const fixture = TestBed.createComponent(AppComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when user is logged in', () => {
    localStorage.setItem('id', 'someId');
    expect(component.isLoggedIn).toBe(true);
  });

  it('should return false when user is not logged in', () => {
    localStorage.removeItem('id');
    expect(component.isLoggedIn).toBe(false);
  });

  it('should return true when user role is client', () => {
    const userData = { role: 'client' };
    localStorage.setItem('userData', JSON.stringify(userData));
    expect(component.isClient).toBe(true);
  });

  it('should return false when user role is not client', () => {
    const userData = { role: 'admin' };
    localStorage.setItem('userData', JSON.stringify(userData));
    expect(component.isClient).toBe(false);
  });

  it('should return true when user role is admin', () => {
    const userData = { role: 'admin' };
    localStorage.setItem('userData', JSON.stringify(userData));
    expect(component.isAdmin).toBe(true);
  });

  it('should return false when user role is not admin', () => {
    const userData = { role: 'client' };
    localStorage.setItem('userData', JSON.stringify(userData));
    expect(component.isAdmin).toBe(false);
  });

  it('should return false when user is not logged in and role is not defined', () => {
    localStorage.removeItem('id');
    localStorage.removeItem('userData');
    expect(component.isLoggedIn).toBe(false);
    expect(component.isClient).toBe(null);
    expect(component.isAdmin).toBe(null);
  });

  it('should return false when user is logged in but role is not defined', () => {
    localStorage.setItem('id', 'someId');
    localStorage.removeItem('userData');
    expect(component.isLoggedIn).toBe(true);
    expect(component.isClient).toBe(null);
    expect(component.isAdmin).toBe(null);
  });
});
