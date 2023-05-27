import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { HttpClientModule } from '@angular/common/http';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavigationComponent} from "./navigation/navigation.component";

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent, SidebarComponent, NavigationComponent],
      imports: [HttpClientModule] // Add HttpClientModule
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the admin component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const sidebarElement = fixture.nativeElement.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });

  it('should render the navigation component', () => {
    const navigationElement = fixture.nativeElement.querySelector('app-navigation');
    expect(navigationElement).toBeTruthy();
  });

  it('should render the total order box', () => {
    const totalOrderBox = fixture.nativeElement.querySelector('.box:nth-child(1)');
    expect(totalOrderBox).toBeTruthy();
  });

  it('should render the total sales box', () => {
    const totalSalesBox = fixture.nativeElement.querySelector('.box:nth-child(2)');
    expect(totalSalesBox).toBeTruthy();
  });

  it('should render the total profit box', () => {
    const totalProfitBox = fixture.nativeElement.querySelector('.box:nth-child(3)');
    expect(totalProfitBox).toBeTruthy();
  });

  it('should render the total return box', () => {
    const totalReturnBox = fixture.nativeElement.querySelector('.box:nth-child(4)');
    expect(totalReturnBox).toBeTruthy();
  });
});
