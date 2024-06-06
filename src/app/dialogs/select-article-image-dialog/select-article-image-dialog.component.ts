  import { Component, Inject, OnInit, Output } from '@angular/core';
  import { BaseDialog } from '../base-dialog';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { FileUplaodDialogState, FileUploadDialogComponent } from '../file-upload-dialog/file-upload-dialog.component';
  import {MatDialogModule} from '@angular/material/dialog';
  import { MatButton, MatButtonModule } from '@angular/material/button';
  import { FileUploadComponent, FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
  import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../services/common/articles.service';
import { Article_List_Image } from '../../contracts/article_list_image';
  @Component({
    selector: 'app-select-article-image-dialog',
    standalone: true,
    imports: [
      MatDialogModule,
      FileUploadComponent,
      FileUploadDialogComponent,
      MatCardModule,
      MatButton,
      CommonModule
    ],
    templateUrl: './select-article-image-dialog.component.html',
    styleUrl: './select-article-image-dialog.component.scss'
  })
  export class SelectArticleImageDialogComponent extends BaseDialog<SelectArticleImageDialogComponent> implements OnInit {

    constructor (
      dialogRef  : MatDialogRef<SelectArticleImageDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data : SelectArticleImageState | string,
      private articleService : ArticlesService
    )
    {
      super(dialogRef)
    } 

    @Output() options : Partial<FileUploadOptions> = {
      acceptedFiles : ".png,.jpg,.jpeg",
      action : "upload",
      controller : "articles",
      queryString :`id=${this.data}`
    }

    images : Article_List_Image[];

    async ngOnInit(){
      this.images = await this.articleService.readArticleImages(this.data as string);

    }

    async deleteImage(imageId :string){
       await this.articleService.deleteImage(this.data as string, imageId)
    }


  }

  export enum SelectArticleImageState{
    Close
  }