import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTicketFormComponent } from './sell-ticket-form.component';

describe('SellTicketFormComponent', () => {
  let component: SellTicketFormComponent;
  let fixture: ComponentFixture<SellTicketFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellTicketFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
