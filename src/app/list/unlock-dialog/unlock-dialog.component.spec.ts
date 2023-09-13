import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockDialogComponent } from './unlock-dialog.component';

describe('UnlockDialogComponent', () => {
  let component: UnlockDialogComponent;
  let fixture: ComponentFixture<UnlockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UnlockDialogComponent]
    });
    fixture = TestBed.createComponent(UnlockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
