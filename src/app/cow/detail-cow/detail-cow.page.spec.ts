import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCowPage } from './detail-cow.page';

describe('DetailCowPage', () => {
  let component: DetailCowPage;
  let fixture: ComponentFixture<DetailCowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailCowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
