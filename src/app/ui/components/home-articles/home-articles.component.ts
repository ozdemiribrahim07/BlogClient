import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-articles',
  standalone: true,
  imports: [
    ListComponent,
    
  ],
  templateUrl: './home-articles.component.html',
  styleUrl: './home-articles.component.scss'
})
export class HomeArticlesComponent {

}
