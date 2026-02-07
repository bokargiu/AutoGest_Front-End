import { inject } from '@angular/core';
import { CanActivateChildFn, Router} from '@angular/router';
import { AuthService } from '../Services/AuthService/auth.service';

export const authGuardGuard: CanActivateChildFn = (childRoute, state) => {
  const _auth = inject(AuthService);
  const _router = inject(Router)
  const valid = _auth.TokenValid();
  if(!valid) _router.navigate(["/login"])
  return valid;
};
