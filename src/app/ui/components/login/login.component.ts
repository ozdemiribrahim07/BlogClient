import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/user.service';

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

  constructor(private userService : UserService){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  async login(usernameOrEmail : string,password : string){
    await this.userService.login(usernameOrEmail, password);
  }


}
