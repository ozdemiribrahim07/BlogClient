
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService, MessagePosition, MessageType } from '../../services/common/alertify.service';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';
import { param } from 'jquery';

export const authGuard: CanActivateFn = (route, state) => {
 

  const jwtHelper: JwtHelperService = inject(JwtHelperService); 
  const router : any = inject(Router);
  const alertify : any = inject(AlertifyService);
  const authService : any = inject(AuthService);
  authService.identityCheck();
  
  if(!_isAuthenticated) {
    router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    alertify.message("Giriş yapmalısınız, Yetkisiz Erişim !", {
      messageType : MessageType.Error,
      messagePosition : MessagePosition.TopRight
    });
  }
   
 

  return true;

  
   


};


