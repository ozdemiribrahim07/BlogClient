import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import { BaseDialog } from '../base-dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButton
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent extends BaseDialog<FileUploadDialogComponent> {

  constructor(dialogRef : MatDialogRef<FileUploadDialogComponent>, @Inject(MAT_DIALOG_DATA) public data : FileUplaodDialogState) {
    super(dialogRef);
  }



}


export enum FileUplaodDialogState{
  Yes,
  No
}
