import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }

  openDialog(dialogParameters : Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      data : dialogParameters.data,
      width : dialogParameters.options?.width
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result ==  dialogParameters.data)
        dialogParameters.afterClosed();
    });
  }

}


export class DialogParameters{
  componentType : ComponentType<any>;
  data : any;
  afterClosed : () => any;
  options: DialogOptions;
}

export class DialogOptions {
  width?: string = "250px";
}