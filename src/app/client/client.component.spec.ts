import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientComponent } from './client.component';
import { ClientNavigationComponent } from './client-navigation/client-navigation.component';
import { ClientAboutComponent } from './client-about/client-about.component';
import { ClientContactComponent } from './client-contact/client-contact.component';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ClientComponent,
        ClientNavigationComponent,
        ClientAboutComponent,
        ClientContactComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the client component', () => {
    expect(component).toBeTruthy();
  });
});
