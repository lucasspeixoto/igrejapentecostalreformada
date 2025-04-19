/* eslint-disable @typescript-eslint/no-unsafe-function-type */
// This file is required by Karma to bootstrap the Angular testing environment
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// In a global setup file or before tests
Object.defineProperty(globalThis.navigator, 'locks', {
  value: {
    request: (_lockName: string, callback: Function) => callback(),
  },
});

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Then you can import your spec files.
// NOTE: Karma will find and run *.spec.ts automatically.
