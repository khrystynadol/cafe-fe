import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemsIngredientsListComponent } from './admin-items-ingredients-list.component';

describe('AdminItemsIngredientsListComponent', () => {
  let component: AdminItemsIngredientsListComponent;
  let fixture: ComponentFixture<AdminItemsIngredientsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminItemsIngredientsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminItemsIngredientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
