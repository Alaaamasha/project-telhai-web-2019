import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  fileData: File = null;
  previewUrl:any = null;

  constructor( 
    private _authService:AuthService,
    private _router: Router,){
  }

  ngOnInit() {
  }

  openLogin(){
    this._router.navigate(['login'])
  }

  async onSubmit(frm){
    try {
      let val = {
        email : frm.value.email,
        imageUrl : this.previewUrl,
        username : frm.value.username,       
        password : frm.value.pass,
      }
      await this._authService.register(val,this.fileData) 
      this._router.navigate(['home'])
    } catch (err) {
      console.error(err); 
    }
  }

  readURL(event): void {
    this.fileData = <File>event.target.files[0];
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
    reader.readAsDataURL(this.fileData); 
  }
}
