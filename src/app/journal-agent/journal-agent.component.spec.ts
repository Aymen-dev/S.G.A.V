import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalAgentComponent } from './journal-agent.component';

describe('JournalAgentComponent', () => {
  let component: JournalAgentComponent;
  let fixture: ComponentFixture<JournalAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
