import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../contracts/user';
import { UserService } from '../../../services/common/user.service';
import { AlertifyService, MessagePosition, MessageType } from '../../../services/common/alertify.service';
import { Create_User } from '../../../contracts/create_user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder : FormBuilder, private userService : UserService, private alertify : AlertifyService) {}
 
  frm : FormGroup;
 
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email : ['', [Validators.required, Validators.email]],
      kullaniciAdi : ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      parola : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      parolaTekrar : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    }, {
      validator : (group  : AbstractControl) : ValidationErrors | null => {
        
        let parola : string = group.get('parola').value;
        let parolaTekrar : string = group.get('parolaTekrar').value;
        return parola === parolaTekrar ? null : {notSame : true}
      }
    })
  }

  get component(){
    return this.frm.controls;
  }


  submitted : boolean = false;
  async onSubmit(user : User) {
        this.submitted = true;

        if(this.frm.invalid){
          return;
        }

     const result : Create_User = await this.userService.create(user);  

        if(result.succeeded) {
          this.alertify.message("Kayıt başarılı gerçekleştirildi", {
            messageType: MessageType.Success,
            messagePosition: MessagePosition.TopRight
          });
        } else {
          this.alertify.message(result.message, {
            messageType: MessageType.Error,
            messagePosition: MessagePosition.TopRight
          });
        }

       
  }




}
