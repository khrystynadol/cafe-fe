import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo image', () => {
    const logoImg = fixture.nativeElement.querySelector('.logo-img');
    expect(logoImg).toBeTruthy();
    expect(logoImg.src).toContain('https://i.pinimg.com/564x/6f/3d/a8/6f3da805c958e070832a18aec0454ea2.jpg');
  });

  it('should render the menu links', () => {
    const menuLinks = fixture.nativeElement.querySelectorAll('.footer-widget ul li a.h5');
    expect(menuLinks.length).toBe(6);
    expect(menuLinks[0].textContent).toBe('Home');
    expect(menuLinks[1].textContent).toBe('Menu');
    expect(menuLinks[2].textContent).toBe('About');
    expect(menuLinks[3].textContent).toBe('Contact');
    expect(menuLinks[4].textContent).toBe('Profile');
    expect(menuLinks[5].textContent).toBe('Log in');
  });

  it('should render the social media links', () => {
    const socialLinks = fixture.nativeElement.querySelectorAll('.social-nav li a');
    expect(socialLinks.length).toBe(2);
    expect(socialLinks[0].href).toBe('https://www.instagram.com/khrystyna_dol');
    expect(socialLinks[1].href).toBe('https://www.facebook.com/hrystyna.dol');
  });

  it('should render the footer text', () => {
    const footerText = fixture.nativeElement.querySelector('.footer-bottom p.simple-text');
    expect(footerText).toBeTruthy();
    expect(footerText.textContent).toBe('© Copyright 2023 The Lavender Cafe. All rights reserved. Designed by Khrystyna Dolynska');
  });
});
