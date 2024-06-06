import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { HttpClientService } from '../../../services/common/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { Article } from '../../../contracts/article';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Article_Add } from '../../../contracts/article_add';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AuthService } from '../../../services/common/auth.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    MatSidenavModule,
    AddComponent,
    ListComponent,
    MatFormFieldModule,
    MatInputModule,
    SweetAlert2Module
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  constructor(private httpClient : HttpClientService){

  }
  


  ngOnInit(): void {
   

  }

  @ViewChild(ListComponent) listComponent : ListComponent


  createdArticle(addArticle : Article_Add){
    this.listComponent.getArticles();
  }


}
