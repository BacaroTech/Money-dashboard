import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserLogService } from '../services/user-log.service';

export const unknowUserGuard: CanActivateFn = (route, state) => {
  const userLog = inject(UserLogService);
  const router = inject(Router);

  // Se l'utente è loggato può accedere alla pagina che vuole
  if (userLog.getUuidUser()) {
    return true
  }

  // Altrimenti lo reinderizziamo alla pagina di login
  return router.parseUrl('/login');;
};
