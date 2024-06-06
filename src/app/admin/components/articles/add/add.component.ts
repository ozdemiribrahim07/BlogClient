import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {AngularEditorComponent, AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ArticlesService } from '../../../../services/common/articles.service';
import { Article_Add } from '../../../../contracts/article_add';
import { AlertifyService, MessagePosition, MessageType } from '../../../../services/common/alertify.service';

import { Article } from '../../../../contracts/article';
import { FileUploadComponent, FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AngularEditorModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  constructor(private articleService : ArticlesService, private alertifyService : AlertifyService){}

  editorContent: string = '';

  @Output() options : Partial<FileUploadOptions> = {
    action : "upload",
    controller : "articles",
    acceptedFiles : ".png,.jpg,.jpeg",
  }
  
  @Output() createdArticle : EventEmitter<Article_Add> = new EventEmitter();


  create(title : HTMLInputElement ){
    const create_article : Article_Add = new Article_Add();
    create_article.title = title.value;
    create_article.content = this.editorContent;

    this.articleService.addArticle(create_article, () => {
      this.alertifyService.message("Makale Eklendi", {
        messageType: MessageType.Success,
        messagePosition: MessagePosition.TopRight
      });
      this.createdArticle.emit(create_article);
    }, errorMessage => {
      this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        messagePosition: MessagePosition.TopRight
      });
    });

  }







  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    
  };

}
