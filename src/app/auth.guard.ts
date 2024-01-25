import { CanActivateFn, Router } from '@angular/router';
import { USER_ID } from './constants/constant';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem(USER_ID)){
    return true;
  }
  inject(Router).navigate(['/'])
  return false;
};
