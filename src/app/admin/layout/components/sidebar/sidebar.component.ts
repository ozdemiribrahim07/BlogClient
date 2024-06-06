import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    MatListModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  


}
