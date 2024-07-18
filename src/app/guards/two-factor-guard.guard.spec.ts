import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { twoFactorGuardGuard } from './two-factor-guard.guard';

describe('twoFactorGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => twoFactorGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
