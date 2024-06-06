import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { User } from '../../contracts/user';
import { Create_User } from '../../contracts/create_user';
import { firstValueFrom } from 'rxjs';
import { Token } from '../../contracts/token';
import { AlertifyService, MessagePosition, MessageType } from './alertify.service';
import { Token_Response } from '../../contracts/token_response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClientService, private alertify : AlertifyService) { }


  async create(user : User) : Promise<Create_User>{
   const observable = this.httpClient.post<Create_User | User>({
      controller : "users",
    }, user);

   return await firstValueFrom(observable) as Create_User;
  }


  
}
