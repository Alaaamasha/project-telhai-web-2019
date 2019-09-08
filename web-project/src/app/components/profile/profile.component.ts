import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currUser:any
  userId:string="";
  prevUserId:string="";

  constructor(
    private _router:Router,
    private _authSvc:AuthService,
    private _afDB:AngularFireDatabase
  ) { }

  async ngOnInit() {
    this.userId = await this._authSvc.getCurrentUserId();
    if(this.userId!=this.prevUserId){ // this trick is to do only one call to get the current user
      this.prevUserId = this.userId; 
      let ref = await this._afDB.database.ref('users');
      await ref.child(this.userId).once('value').then((snapshot)=>{
        const currUser = snapshot.val();
        this.currUser = {
          email:currUser.email,
          username:currUser.username,
          imageUrl:currUser.imageUrl,
          friendsList: currUser.friendsList ?currUser.friendsList:[] ,
          friendsRequestList : currUser.friendsRequestList ? currUser.friendsRequestList:[],
          posts:currUser.posts ? currUser.posts:[] 
        }
      });
    }
  }

  openFriendsComponent(){
    this._router.navigate(['friends'])
  }

  openHomeComponent(){
    this._router.navigate(['home'])
  }

  async logout(){
    try {
      await this._authSvc.logout();
      this._router.navigate(['login'])
    } catch (error) {
      console.error(error);
    }
  }
}
