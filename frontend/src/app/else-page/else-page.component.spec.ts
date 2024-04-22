import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElsePageComponent } from './else-page.component';

describe('ElsePageComponent', () => {
  let component: ElsePageComponent;
  let fixture: ComponentFixture<ElsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElsePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
