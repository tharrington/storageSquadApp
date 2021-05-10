import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnloadPage } from './unload.page';

describe('UnloadPage', () => {
  let component: UnloadPage;
  let fixture: ComponentFixture<UnloadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnloadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnloadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
