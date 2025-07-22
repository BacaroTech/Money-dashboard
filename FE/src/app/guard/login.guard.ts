import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserLogService } from '../services/user-log.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const userLog = inject(UserLogService);
  const router = inject(Router);

  // Se l'utente è loggato, lo reindirizziamo alla dashboard
  if (userLog.getUuidUser()) {
    return router.parseUrl('/dashboard');
  }

  // Altrimenti può accedere alla pagina di login
  return true;
};