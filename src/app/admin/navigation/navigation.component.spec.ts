import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let sidebar: HTMLElement;
  let sidebarBtn: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sidebar = fixture.nativeElement.querySelector('.sidebar');
    sidebarBtn = fixture.nativeElement.querySelector('.sidebarBtn i');
  });

  it('should create the navigation component', () => {
    expect(component).toBeTruthy();
  });
});
