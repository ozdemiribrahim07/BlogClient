import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../../services/common/articles.service';
import { Article_List } from '../../../../contracts/article_list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PipseModule } from '../../../../admin/components/pipse/pipse.module';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule,PipseModule,RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  constructor(private articleService : ArticlesService, private activatedRoute : ActivatedRoute) { }
  
   articles: Article_List[];

  // async ngOnInit() {
  //  const data : {total : number, articles : Article_List[]} = await this.articleService.listArticle(0,5, () => {

  //   }, error => {

  //   });

  //   data.articles = this.articles;
  // }

  currentPageNo : number;
  totalCount : number;
  totalPageCount : number;
  pageSize : number = 3;
  pageList : number[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
     this.currentPageNo = parseInt(params['pageNo'] ?? 1);
     this.articleService.listArticle(this.currentPageNo - 1, this.pageSize, () => {
      
     }).subscribe(

        (data: { total: number; articles: Article_List[] }) => {

          this.articles = data.articles; //backenden gelenle bağlandı
          this.totalCount = data.total; // backenden gelenle bağlandı
          this.totalPageCount = Math.ceil(this.totalCount / this.pageSize); //total makaleyi belirlenen sayıya böldük ve sayfa sayısı aldık.
          this.pageList = []; // route değiştiğinde listeyi sıfırla.

          if (this.currentPageNo - 3 <= 0)
            for (let i = 1; i <= 7; i++)
              this.pageList.push(i);
    
          else if (this.currentPageNo + 3 >= this.totalPageCount)
            for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
              this.pageList.push(i);
    
          else
            for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
              this.pageList.push(i);

        },
        (error) => {
          
        }
      );
    });

    
  }



}
