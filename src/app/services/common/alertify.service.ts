import { Injectable } from '@angular/core';

declare var alertify : any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message:string, alertifyOptions : AlertifyOptions) {
    alertify.set('notifier','position', alertifyOptions.messagePosition);
    alertify[alertifyOptions.messageType](message);
  }


}

export class AlertifyOptions{
  messagePosition : MessagePosition  = MessagePosition.TopRight
  messageType : MessageType
}


export enum MessageType {
  Success = "success",
  Error  = "error",
  Warning = "warning",
  Message = "message"
}

export enum MessagePosition {
  TopLeft = "top-left",
  TopRight = "top-right",
  TopCenter = "top-center",
  BottomLeft = "bottom-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center"
}