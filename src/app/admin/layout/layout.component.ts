import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AlertifyService, MessagePosition, MessageType } from '../../services/common/alertify.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    MainComponent,
    RouterModule,
    MatSidenavModule,
    SidebarComponent,
    SweetAlert2Module
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor (private alertify : AlertifyService) {

   }

  ngOnInit(): void {
   
  }


}
