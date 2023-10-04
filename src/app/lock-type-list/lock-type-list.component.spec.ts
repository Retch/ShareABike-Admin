import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LockTypeListComponent} from './lock-type-list.component';

describe('LockTypeListComponent', () => {
  let component: LockTypeListComponent;
  let fixture: ComponentFixture<LockTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LockTypeListComponent]
    });
    fixture = TestBed.createComponent(LockTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
