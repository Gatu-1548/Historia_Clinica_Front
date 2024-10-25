import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsuariosComponent } from './manage-usuarios.component';

describe('ManageUsuariosComponent', () => {
  let component: ManageUsuariosComponent;
  let fixture: ComponentFixture<ManageUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
