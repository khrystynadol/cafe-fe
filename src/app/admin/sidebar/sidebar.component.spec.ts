import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the sidebar component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logoElement = fixture.nativeElement.querySelector('.logo');
    expect(logoElement).toBeTruthy();
  });

  it('should render the active dashboard link', () => {
    const dashboardLinkElement = fixture.nativeElement.querySelector('.nav-links li:first-child .active');
    expect(dashboardLinkElement).toBeTruthy();
  });

  it('should render the add menu item link', () => {
    const addMenuItemLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(2) a');
    expect(addMenuItemLinkElement).toBeTruthy();
  });

  it('should render the product link', () => {
    const productLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(3) a');
    expect(productLinkElement).toBeTruthy();
  });

  it('should render the order list link', () => {
    const orderListLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(4) a');
    expect(orderListLinkElement).toBeTruthy();
  });

  it('should render the user list link', () => {
    const userListLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(5) a');
    expect(userListLinkElement).toBeTruthy();
  });

  it('should render the analytics link', () => {
    const analyticsLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(6) a');
    expect(analyticsLinkElement).toBeTruthy();
  });

  it('should render the stock link', () => {
    const stockLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(7) a');
    expect(stockLinkElement).toBeTruthy();
  });

  it('should render the total order link', () => {
    const totalOrderLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(8) a');
    expect(totalOrderLinkElement).toBeTruthy();
  });

  it('should render the messages link', () => {
    const messagesLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(9) a');
    expect(messagesLinkElement).toBeTruthy();
  });

  it('should render the settings link', () => {
    const settingsLinkElement = fixture.nativeElement.querySelector('.nav-links li:nth-child(10) a');
    expect(settingsLinkElement).toBeTruthy();
  });

  it('should render the log out link', () => {
    const logoutLinkElement = fixture.nativeElement.querySelector('.nav-links .log-out a');
    expect(logoutLinkElement).toBeTruthy();
  });

  it('should call logout and navigate to root on log out link click', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');

    const logoutLinkElement = fixture.nativeElement.querySelector('.nav-links .log-out a');
    logoutLinkElement.click();

    expect(localStorage.removeItem).toHaveBeenCalledWith('id');
    expect(localStorage.removeItem).toHaveBeenCalledWith('email');
    expect(localStorage.removeItem).toHaveBeenCalledWith('password');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
