import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
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

  }

}