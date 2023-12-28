import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailFarmPage } from './detail-farm.page';

describe('DetailFarmPage', () => {
  let component: DetailFarmPage;
  let fixture: ComponentFixture<DetailFarmPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailFarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
