import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CowPage } from './cow.page';

describe('CowPage', () => {
  let component: CowPage;
  let fixture: ComponentFixture<CowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
