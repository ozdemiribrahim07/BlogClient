import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { ArticlesComponent } from './admin/components/articles/articles.component';
import { CategoriesComponent } from './admin/components/categories/categories.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { HomeArticlesComponent } from './ui/components/home-articles/home-articles.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';

declare var $ : any

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    ArticlesComponent,
    CategoriesComponent,
    DashboardComponent,
    HomeComponent,
    HomeArticlesComponent,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  
  }
  title = 'BlogClient';


  
}

