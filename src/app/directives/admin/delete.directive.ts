import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { ArticlesService } from '../../services/common/articles.service';
import { AlertifyService, MessagePosition, MessageType } from '../../services/common/alertify.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

declare var $ : any

@Directive({
  selector: '[appDelete]',
  standalone: true
})
export class DeleteDirective implements OnInit   {

  constructor(
      private elementRef : ElementRef,
      private _renderer : Renderer2,
      private httpClient : HttpClientService, 
      private alertify : AlertifyService)
  { 
    const img = _renderer.createElement("img");
    img.setAttribute("src","/assets/delete.png");
    img.setAttribute("style","width: 30px; height: 30px; cursor: pointer;");
    _renderer.appendChild(elementRef.nativeElement, img);
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  @Input() id : string;
  @Input() controller : string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick(){
    this.openDialog( async () => {
      const td : HTMLTableCellElement = this.elementRef.nativeElement;
      this.httpClient.delete({
        controller : this.controller
      },this.id).subscribe(data => {
        $(td.parentElement).fadeOut(1000, () => {
          this.callback.emit();
          this.alertify.message("Başarılı şekilde silindi", {
            messageType: MessageType.Success,
            messagePosition: MessagePosition.TopRight
          })
        });
      }, (error : HttpErrorResponse) => {
        this.alertify.message("Hata !", {
          messageType: MessageType.Error,
          messagePosition: MessagePosition.TopRight
        })
      })
    });
    
    
  }

 openDialog(afterClosed : any){
  Swal.fire({
    title: "Emin misin?",
    text: "Bu işlemi geri dönderemiyeceksin!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Evet. Sil!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Silindi!",
        text: "Silinme işlemi tamamlandı.",
        icon: "success"
      });
      afterClosed();
    }
  });

 }
  

}
