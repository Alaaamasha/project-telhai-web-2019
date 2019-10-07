import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IUser, IFriendRequest } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.component.html',
  styleUrls: ['./friends-requests.component.scss']
})



export class FriendsRequestsComponent implements OnInit {
    
  userId: string;
  friendsRequestsList: IFriendRequest[] = [];
  _currUser: IUser = null;

  constructor(
        private _authSvc: AuthService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _db: AngularFireDatabase
      ) { }
    
    async ngOnInit() {
      this.userId =  await this._authSvc.getCurrentUserId();
      this._currUser = this._authSvc.get(); 
      await this._db.database.ref("users")
      .child(this.userId)
      .child("friendsRequestList").
      once('value', (snapshot) =>{
        let requests = snapshot.val();
        for (let key in requests) {
          const value = requests[key];
          this.friendsRequestsList.push(<IFriendRequest>{
            id:value.id,
            imageUrl:value.imageUrl,
            username:value.username
          })
        }
      })
    }

    async acceptRejectRequest(user,status){

      // create modal are u sure;
      return;
      if(status){
        await this._db.database.ref('users')
        .child(this._currUser.id)
        .child("friendsList")
        .set({
          // set the new friend to curr user FRIENDSLIST
        }) 
        
        await this._db.database.ref('users')
        .child(user.id)
        .child("friendsList")
        .child(this._currUser.id)
        .set({
          // set the curr user into new friend FRIENDSLIST
          id:this._currUser.id,
          username : this._currUser.username,
        }) 

      }
      let idx = this.friendsRequestsList.findIndex(req => req.id==user.id);
      this.friendsRequestsList.splice(idx,1);
      await this._db.database.ref('users')
      .child(this._currUser.id)
      .update({
        "friendsRequestList": this.friendsRequestsList
      }) 
    }

}