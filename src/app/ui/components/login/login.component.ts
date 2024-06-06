import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/user.service';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../../services/common/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit  {

  constructor(private userAuthService : UserAuthService, private authService : AuthService, private activatedRoute : ActivatedRoute, private router : Router){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  async login(usernameOrEmail : string,password : string){
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl = params['returnUrl'];
        if(returnUrl){
         this.router.navigate([returnUrl]);
        }
      })
    });
  }


}
