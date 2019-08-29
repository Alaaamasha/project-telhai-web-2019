import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currUser:IUser;
  a:any;

  constructor(
    private _router:Router,
    private _authSvc:AuthService
  ) { }

  async ngOnInit() {
    // this.currUser = this._authSvc.getCurrentUser()
    this.currUser = this._authSvc.getCurrentUser()
    console.log(this.currUser.imageUrl);
  }

  openFriendsComponent(){
    this._router.navigate(['friends'])
  }

  openHomeComponent(){
    this._router.navigate(['home'])
  }
}
