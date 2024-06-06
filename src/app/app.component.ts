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
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/common/auth.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AlertifyService, MessagePosition, MessageType } from './services/common/alertify.service';
import { routes } from './app.routes';

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
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(public authService : AuthService, private alertify :AlertifyService){
    authService.identityCheck();
  }

  logout(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.alertify.message("Cıkış Yapıldı", {
      messageType : MessageType.Warning,
      messagePosition : MessagePosition.TopRight
    })
  }


  ngOnInit(): void {
  
  }
  title = 'BlogClient';


  
}

