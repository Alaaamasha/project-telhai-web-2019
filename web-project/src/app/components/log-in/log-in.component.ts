import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor( 
    private _authService:AuthService,
    private _router: Router,){
  }

  ngOnInit() {
  }

  openRegister(){
    this._router.navigate(['register'])
  }

  async onSubmit(frm:NgForm){
    try {
      await this._authService.login(frm.value.email,frm.value.pass) 
      this._router.navigate(['home'])
    } catch (err) {
      console.error(err);
      alert(err.message); 
    }
  }

}
