import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service'
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const authService = new AuthService(router);

  const currentState = authService.activ();
  if (!currentState) {
    router.navigate(["/login"])
  }
  authService.changeActiv();
  return currentState;
};
