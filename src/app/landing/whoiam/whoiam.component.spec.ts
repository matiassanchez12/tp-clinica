import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoiamComponent } from './whoiam.component';

describe('WhoiamComponent', () => {
  let component: WhoiamComponent;
  let fixture: ComponentFixture<WhoiamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoiamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhoiamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
