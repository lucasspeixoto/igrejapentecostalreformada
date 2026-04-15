import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMenuitem } from './menuitem';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { LayoutService } from '../../../data/services/shared/layout';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AppMenuitem', () => {
  let component: AppMenuitem;
  let fixture: ComponentFixture<AppMenuitem>;

  const menuSourceSubject = new Subject<unknown>();
  const resetSourceSubject = new Subject<void>();
  const routerEventsSubject = new Subject<unknown>();

  const mockLayoutService = {
    menuSource$: menuSourceSubject.asObservable(),
    resetSource$: resetSourceSubject.asObservable(),
    onMenuStateChange: vi.fn(),
  };

  const mockRouter = {
    events: routerEventsSubject.asObservable(),
    url: '/test/route',
    isActive: vi.fn().mockReturnValue(false),
    createUrlTree: vi.fn().mockReturnValue({}),
    serializeUrl: vi.fn().mockReturnValue(''),
    routerState: {
      root: {
        firstChild: null,
        snapshot: {}
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMenuitem, CommonModule, RouterModule.forRoot([])],
      providers: [
        { provide: LayoutService, useValue: mockLayoutService },
        { provide: Router, useValue: mockRouter },
      ],
    }).overrideComponent(AppMenuitem, {
      set: {
        providers: [
          { provide: LayoutService, useValue: mockLayoutService },
        ]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AppMenuitem);
    component = fixture.componentInstance;

    component.item = { label: 'Test Item', routerLink: ['/test'] };
    component.index = 0;
    component.root = true;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should toggle active state on itemClick if it has items', () => {
    component.item = { label: 'Parent', items: [{ label: 'Child' }] };
    fixture.detectChanges();

    const event = new MouseEvent('click');
    component.itemClick(event);

    expect(component.active).toBe(true);
    expect(mockLayoutService.onMenuStateChange).toHaveBeenCalled();
  });

  it('should not toggle if item is disabled', () => {
    component.item = { label: 'Disabled', disabled: true };
    fixture.detectChanges();

    const event = new MouseEvent('click');
    const spy = vi.spyOn(event, 'preventDefault');
    component.itemClick(event);

    expect(spy).toHaveBeenCalled();
    expect(mockLayoutService.onMenuStateChange).not.toHaveBeenCalled();
  });

  it('should update active state from layout service menuSource', async () => {
    component.key = '0';
    fixture.detectChanges();

    menuSourceSubject.next({ key: '0', routeEvent: true });
    
    // Using Promise.resolve().then() because of the component's implementation
    await Promise.resolve();
    expect(component.active).toBe(true);
  });

  it('should reset active state from layout service resetSource', () => {
    component.active = true;
    fixture.detectChanges();

    resetSourceSubject.next();
    expect(component.active).toBe(false);
  });

  it('should update active state on router events', () => {
    const updateSpy = vi.spyOn(component, 'updateActiveStateFromRoute');
    fixture.detectChanges();

    routerEventsSubject.next(new NavigationEnd(1, '/test', '/test'));
    expect(updateSpy).toHaveBeenCalled();
  });
});
