import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isLoading signal with false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should update isLoading signal when set', () => {
    // Initial state
    expect(service.isLoading()).toBe(false);

    // Set to true
    service.isLoading.set(true);
    expect(service.isLoading()).toBe(true);

    // Set back to false
    service.isLoading.set(false);
    expect(service.isLoading()).toBe(false);
  });

  it('should update isLoading signal with update method', () => {
    // Initial state
    expect(service.isLoading()).toBe(false);

    // Update using a function
    service.isLoading.update(current => !current);
    expect(service.isLoading()).toBe(true);

    // Update again
    service.isLoading.update(current => !current);
    expect(service.isLoading()).toBe(false);
  });
});
