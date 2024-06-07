import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ArticlesService } from '../../../../services/common/articles.service';
import { AlertifyService, MessagePosition, MessageType } from '../../../../services/common/alertify.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Article_List } from '../../../../contracts/article_list';
import { PipseModule } from '../../pipse/pipse.module';
import { DeleteDirective } from '../../../../directives/admin/delete.directive';
import { DialogService } from '../../../../services/common/dialog.service';
import { SelectArticleImageDialogComponent } from '../../../../dialogs/select-article-image-dialog/select-article-image-dialog.component';
import { MatButton } from '@angular/material/button';


declare var $ : any

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    PipseModule,
    DeleteDirective,
    MatButton
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  constructor(private articleService : ArticlesService, private alertifyService : AlertifyService, private dialogService : DialogService) { }



  displayedColumns: string[] = ['title', 'content', 'createdTime', 'updatedTime','photo','delete','edit'];
  dataSource : MatTableDataSource<Article_List> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getArticles() {
    try {
      this.articleService.listArticle(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5)
        .subscribe({
          next: (allArticles: { total: number; articles: Article_List[] }) => {
            this.dataSource = new MatTableDataSource<Article_List>(allArticles.articles);
            this.paginator.length = allArticles.total;
            this.alertifyService.message("Makaleler listelendi", {
              messageType: MessageType.Success,
              messagePosition: MessagePosition.TopRight
            });
          },
          error: (errorMessage: string) => {
            this.alertifyService.message(errorMessage, {
              messageType: MessageType.Error,
              messagePosition: MessagePosition.TopRight
            });
          }
        });
    } catch (error) {
      console.error('Beklenmeyen bir hata oluştu:', error);
    }
  }

  // async getArticles(){
  //   const allArticles : {total : number, articles : Article_List[]} = await this.articleService.listArticle(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,  
  //     () => this.alertifyService.message("Makaleler listelendi", {
  //     messageType: MessageType.Success,
  //     messagePosition: MessagePosition.TopRight
  //   }), errorMessage => this.alertifyService.message(errorMessage, {
  //     messageType: MessageType.Error,
  //     messagePosition: MessagePosition.TopRight
  //   }))

  //   this.dataSource = new MatTableDataSource<Article_List>(allArticles.articles);
  //   this.paginator.length = allArticles.total;
   
  // }


  addArticleImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectArticleImageDialogComponent,
      data: id,
      options : {
        width : "1500px"
      }
    });
  }


  async pageEvent(){
    await this.getArticles();
  }

  
  async ngOnInit(){
    await this.getArticles()
  }



}


