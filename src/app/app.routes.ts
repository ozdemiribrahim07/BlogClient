import { Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import path from 'path';
import { ArticlesComponent } from './admin/components/articles/articles.component';
import { CategoriesComponent } from './admin/components/categories/categories.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { HomeComponent } from './ui/components/home/home.component';
import { HomeArticlesComponent } from './ui/components/home-articles/home-articles.component';
import { RegisterComponent } from './ui/components/register/register.component';
import { LoginComponent } from './ui/components/login/login.component';

export const routes: Routes = [
    
    {path : "admin" , component : LayoutComponent, children : [
        {path : "" , component : DashboardComponent},
        {path : "articles", component : ArticlesComponent},
        {path : "categories", component : CategoriesComponent},
    ]},

    {path : "", component : HomeComponent},
    {path : "articles", component : HomeArticlesComponent},
    {path : "register", component : RegisterComponent},
    {path : "login", component : LoginComponent},
        
    
];
