import { Injectable, effect, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { $t } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

declare type SurfacesType = {
  name?: string;
  palette?: {
    0?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
  };
};

export interface layoutConfig {
  preset?: string;
  primary?: string;
  surface?: string | undefined | null;
  darkTheme?: boolean;
  menuMode?: string;
}

interface LayoutState {
  staticMenuDesktopInactive?: boolean;
  overlayMenuActive?: boolean;
  configSidebarVisible?: boolean;
  staticMenuMobileActive?: boolean;
  menuHoverActive?: boolean;
}

interface MenuChangeEvent {
  key: string;
  routeEvent?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public platformId = inject(PLATFORM_ID);

  public menuModeOptions = [
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' },
  ];

  public amberSurfaceType: SurfacesType = {
    name: 'amber',
    palette: {
      '50': '#fffbeb',
      '100': '#fef3c7',
      '200': '#fde68a',
      '300': '#fcd34d',
      '400': '#fbbf24',
      '500': '#f59e0b',
      '600': '#d97706',
      '700': '#b45309',
      '800': '#92400e',
      '900': '#78350f',
      '950': '#451a03',
    },
  };

  public zincSurface: SurfacesType = {
    name: 'zinc',
    palette: {
      0: '#ffffff',
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
  };

  private _config: layoutConfig = {
    preset: 'Lara',
    primary: 'amber',
    surface: 'zinc',
    darkTheme: true,
    menuMode: 'static',
  };

  private _state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  public layoutConfig = signal<layoutConfig>(this._config);

  public layoutState = signal<LayoutState>(this._state);

  private configUpdate = new Subject<layoutConfig>();

  private overlayOpen = new Subject();

  private menuSource = new Subject<MenuChangeEvent>();

  private resetSource = new Subject();

  public menuSource$ = this.menuSource.asObservable();

  public resetSource$ = this.resetSource.asObservable();

  public configUpdate$ = this.configUpdate.asObservable();

  public overlayOpen$ = this.overlayOpen.asObservable();

  public theme = computed(() => (this.layoutConfig()?.darkTheme ? 'light' : 'dark'));

  public isSidebarActive = computed(
    () => this.layoutState().overlayMenuActive || this.layoutState().staticMenuMobileActive
  );

  public isDarkTheme = computed(() => this.layoutConfig().darkTheme);

  public isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

  public transitionComplete = signal<boolean>(false);

  private initialized = false;

  constructor() {
    effect(() => {
      const config = this.layoutConfig();

      if (config) {
        this.onConfigUpdate();
      }
    });

    effect(() => {
      const config = this.layoutConfig();

      if (!this.initialized || !config) {
        this.initialized = true;
        return;
      }

      this.handleDarkModeTransition(config);
    });
  }

  private handleDarkModeTransition(config: layoutConfig): void {
    if ((document as Document).startViewTransition) {
      this.startViewTransition(config);
    } else {
      this.toggleDarkMode(config);
      this.onTransitionEnd();
    }
  }

  private startViewTransition(config: layoutConfig): void {
    const transition = (document as Document).startViewTransition(() => {
      this.toggleDarkMode(config);
    });

    transition.ready
      .then(() => {
        this.onTransitionEnd();
      })
      .catch(() => {});
  }

  public toggleDarkMode(config?: layoutConfig): void {
    const _config = config || this.layoutConfig();
    if (_config.darkTheme) {
      document.documentElement.classList.add('app-dark');
      localStorage.setItem('IPR-SISTEMA-GESTAO:THEME', 'dark');
    } else {
      document.documentElement.classList.remove('app-dark');
      localStorage.setItem('IPR-SISTEMA-GESTAO:THEME', 'light');
    }
  }

  public setInitialStorageTheme(): void {
    const theme = localStorage.getItem('IPR-SISTEMA-GESTAO:THEME') || 'dark';
    this.layoutConfig.update(state => ({ ...state, darkTheme: theme === 'dark' }));
    this.toggleDarkMode(this.layoutConfig());
  }

  private onTransitionEnd(): void {
    this.transitionComplete.set(true);
    setTimeout(() => {
      this.transitionComplete.set(false);
    });
  }

  public onMenuToggle(): void {
    if (this.isOverlay()) {
      this.layoutState.update(prev => ({
        ...prev,
        overlayMenuActive: !this.layoutState().overlayMenuActive,
      }));

      if (this.layoutState().overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.layoutState.update(prev => ({
        ...prev,
        staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive,
      }));
    } else {
      this.layoutState.update(prev => ({
        ...prev,
        staticMenuMobileActive: !this.layoutState().staticMenuMobileActive,
      }));

      if (this.layoutState().staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getThemeSemantic(): any {
    return {
      semantic: {
        primary: this.amberSurfaceType.palette,
        colorScheme: {
          light: {
            primary: {
              color: '{primary.500}',
              contrastColor: '#ffffff',
              hoverColor: '{primary.600}',
              activeColor: '{primary.700}',
            },
            highlight: {
              background: '{primary.50}',
              focusBackground: '{primary.100}',
              color: '{primary.700}',
              focusColor: '{primary.800}',
            },
          },
          dark: {
            primary: {
              color: '{primary.400}',
              contrastColor: '{surface.900}',
              hoverColor: '{primary.300}',
              activeColor: '{primary.200}',
            },
            highlight: {
              background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
              focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
              color: 'rgba(255,255,255,.87)',
              focusColor: 'rgba(255,255,255,.87)',
            },
          },
        },
      },
    };
  }

  public startAppConfig(): void {
    this.layoutConfig.update(state => ({ ...state, preset: 'Lara' }));

    $t()
      .preset(Lara)
      .preset(this.getThemeSemantic())
      .surfacePalette(this.zincSurface?.palette)
      .use({ useDefaultOptions: true });
  }

  public isDesktop(): boolean {
    return window.innerWidth > 991;
  }

  public isMobile(): boolean {
    return !this.isDesktop();
  }

  public onConfigUpdate(): void {
    this._config = { ...this.layoutConfig() };
    this.configUpdate.next(this.layoutConfig());
  }

  public onMenuStateChange(event: MenuChangeEvent): void {
    this.menuSource.next(event);
  }

  public reset(): void {
    this.resetSource.next(true);
  }
}
