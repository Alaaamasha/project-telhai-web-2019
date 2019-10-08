import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/interfaces';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currUser: IUser;
  friendsCount : number;
  postsCount : number;

  constructor(
    private _router:Router,
    private _authSvc:AuthService,
    private _afDB:AngularFireDatabase,
    private _route : ActivatedRoute
  ) { }

  async ngOnInit() {
    await this._authSvc.initCurrUserData();
    this.currUser = this._authSvc.get()
    
    let postsList = this.currUser.posts ? 
    Object.keys(this.currUser.posts).map(key => ({id: key, value: this.currUser.friendsRequestList[key]})):[];  
        
    let friendssList = this.currUser.friendsList ? 
    Object.keys(this.currUser.friendsList).map(key => ({id: key, value: this.currUser.friendsList[key]})):[];
    
    this.friendsCount = friendssList.length 
    this.postsCount =postsList.length
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
      this._authSvc.set(null);
      this._router.navigate(['login'])
    } catch (error) {
      console.error(error);
    }
  }
}
