import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WarehouseListPage } from './warehouse-list.page';

describe('WarehouseListPage', () => {
  let component: WarehouseListPage;
  let fixture: ComponentFixture<WarehouseListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
