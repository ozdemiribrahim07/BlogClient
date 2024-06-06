import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessagePosition, MessageType } from '../alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUplaodDialogState, FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { MatButton } from '@angular/material/button';
import { SelectArticleImageDialogComponent } from '../../../dialogs/select-article-image-dialog/select-article-image-dialog.component';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxFileDropModule,
    MatButton,
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(
    private httpClient : HttpClientService,
    private alertift : AlertifyService,
    private dialog : MatDialog,
    private dialogService : DialogService
  ) 
  { }

  @Input() options : Partial<FileUploadOptions>;

  public files: NgxFileDropEntry[];

  public dropped(files: NgxFileDropEntry[]) {

    this.files = files;
    const formData = new FormData()
    for (const droppedFile of files) {
      (droppedFile.fileEntry as FileSystemFileEntry).file((file: File) => {
        formData.append(droppedFile.relativePath, file, droppedFile.relativePath)
      })
    }

    this.dialogService.openDialog({
      componentType : FileUploadDialogComponent,
      data : FileUplaodDialogState.Yes,
      afterClosed  : () => {
        this.httpClient.post({
          controller : this.options.controller,
          action : this.options.action,
          queryString : this.options.queryString,
          headers : new HttpHeaders({ "responseType" : "blob" })
        },formData).subscribe(res => {
          this.alertift.message("Dosya veya dosyalar başarıyla yüklendi", {
            messagePosition : MessagePosition.TopRight,
            messageType  : MessageType.Success
          })
        },(errorResponse : HttpErrorResponse) => {  
          this.alertift.message("Dosya veya dosyalar yüklenirken hata oluştu", {
            messagePosition : MessagePosition.TopRight,
            messageType  : MessageType.Error
          })
        })
      }
    })
  }
}
  


export class FileUploadOptions {
   controller? : string;
   action? : string;
   queryString? : string;
   acceptedFiles? : string;
}

