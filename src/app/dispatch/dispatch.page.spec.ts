import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DispatchPage } from './dispatch.page';

describe('DispatchPage', () => {
  let component: DispatchPage;
  let fixture: ComponentFixture<DispatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DispatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
