import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { AlertifyService, MessagePosition, MessageType } from './alertify.service';
import { Token_Response } from '../../contracts/token_response';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClient : HttpClientService, private alertify : AlertifyService) { }

  async login( emailOrUsername : string, password : string, callback? : () => void) {
    const observable = this.httpClient.post<any | Token_Response>({
      controller : "auth",
      action : "login"
    ,}, { 
      emailOrUsername : emailOrUsername,
      password : password,
      
    })
    
   const tokenResponse : Token_Response =  await firstValueFrom(observable) as Token_Response;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.alertify.message("Kullanıcı girişi başarılı", {
        messageType: MessageType.Success,
        messagePosition: MessagePosition.TopRight
      })
    }else{
      this.alertify.message("Kullanıcı bilgileri hatalı", {
        messageType: MessageType.Error,
        messagePosition: MessagePosition.TopRight
      })
    }

    callback();

  }







}
