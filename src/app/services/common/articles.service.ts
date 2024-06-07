import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Article_Add } from '../../contracts/article_add';
import { HttpErrorResponse } from '@angular/common/http';
import { Article_List } from '../../contracts/article_list';
import { error } from 'console';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { Article_List_Image } from '../../contracts/article_list_image';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private httpClient : HttpClientService,private alertify : AlertifyService) 
  { }


  addArticle(article : Article_Add,  successCallBack? : any, errorCallBack?: (errorMessage: string) => void) {

    this.httpClient.post({
      controller : "articles"
    },article).subscribe(result => {
      successCallBack();
    }, (errorResponse : HttpErrorResponse) => {
        const _error : Array<{key : string, value : Array<string>}> = errorResponse.error;
        let message =  "";
        _error.forEach((v,i) => {
          v.value.forEach((v,i) => {
            message += `${v}<br>`;
          });
        });
        errorCallBack(message);
    });
  }

  listArticle(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Observable<{ total: number; articles: Article_List[] }> {

    return this.httpClient
      .get<{ total: number; articles: Article_List[] }>({
        controller: 'articles',
        queryString: `page=${page}&size=${size}`
      })
      .pipe(
        map(response => {
          if (successCallBack) successCallBack();
          return response;
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          if (errorCallBack) errorCallBack(errorResponse.message);
          return of({ total: 0, articles: [] });
        })
      );
  }

  // async listArticle(page: number = 0,size: number = 5,successCallBack? : () => void, errorCallBack?: (errorMessage: string) => void) : Promise<{total : number, articles : Article_List[]}>{

  //   const promiseData : Promise<{total : number, articles : Article_List[]}> =  this.httpClient.get<{total : number, articles : Article_List[]}>({
  //     controller : "articles",
  //     queryString : `page=${page}&size=${size}`
  //   }).toPromise();

  //   promiseData.then(x => successCallBack())
  //   .catch((errorResponse : HttpErrorResponse) => errorCallBack(errorResponse.message))

  //   return await promiseData;

  // }



  async delete(id : string){
    const data : any = await this.httpClient.delete({
      controller  : "articles",
    },id);

   await firstValueFrom(data)

  }



  async readArticleImages(id :string): Promise<Article_List_Image[]>{
   const observable =  this.httpClient.get<Article_List_Image[]>({
        action : "getimages",
        controller : "articles"
      }, id);

    return await firstValueFrom(observable);
  }



  async deleteImage(id :string, imageId : string){
    const observable =  this.httpClient.delete({
        controller : "articles",
        action : "removeimage",
        queryString : `imageId=${imageId}`
      }, id)

      await firstValueFrom(observable);

  }


}
