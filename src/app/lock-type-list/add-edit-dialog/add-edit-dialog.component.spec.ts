import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEditDialogComponent} from './add-edit-dialog.component';

describe('AddEditDialogComponent', () => {
  let component: AddEditDialogComponent;
  let fixture: ComponentFixture<AddEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddEditDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
