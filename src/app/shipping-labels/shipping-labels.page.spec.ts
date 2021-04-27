import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShippingLabelsPage } from './shipping-labels.page';

describe('ShippingLabelsPage', () => {
  let component: ShippingLabelsPage;
  let fixture: ComponentFixture<ShippingLabelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingLabelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingLabelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
