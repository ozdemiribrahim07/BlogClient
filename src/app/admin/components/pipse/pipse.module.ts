import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KisaltPipe } from '../articles.pipe';



@NgModule({
  declarations: [
    KisaltPipe
  ],
  imports: [
    CommonModule
  ],
  exports : [
    KisaltPipe
  ]
})
export class PipseModule { }
