/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { providePrimeNG } from 'primeng/config';
import { LayoutService } from './app/layout/service/layout.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let layoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(() => {
    const layoutServiceMock = { startAppConfig: jasmine.createSpy('layoutServiceSpy') };

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        ToastModule,
        MessageService,
        providePrimeNG(),
        { provide: LayoutService, useValue: layoutServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    layoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
