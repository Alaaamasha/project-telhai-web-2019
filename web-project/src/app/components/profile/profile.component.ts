import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currUser:any
  userId:string;

  constructor(
    private _router:Router,
    private _authSvc:AuthService,
    private _afDB:AngularFireDatabase
  ) { }

  async ngOnInit() {
    // this.currUser = this._authSvc.getCurrentUser()
    this.userId = await this._authSvc.getCurrentUser();
    let user;
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
        debugger;
    });
    console.log(this.currUser);
  }
    // this.currUser = this._authSvc._currUser;
    // console.log(typeof(this.currUser));
  

  openFriendsComponent(){
    this._router.navigate(['friends'])
  }

  openHomeComponent(){
    this._router.navigate(['home'])
  }
}
