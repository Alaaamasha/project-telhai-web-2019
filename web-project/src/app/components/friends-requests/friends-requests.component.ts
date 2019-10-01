import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IUser, IFriendRequest } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.component.html',
  styleUrls: ['./friends-requests.component.scss']
})



export class FriendsRequestsComponent implements OnInit {
    
  userId: string;
  friendsRequestsList: IFriendRequest[] = [];

  constructor(
        private _authSvc: AuthService,
        private _router: Router,
        private _db: AngularFireDatabase
      ) { }
    
    async ngOnInit() {
      this.userId =  await this._authSvc.getCurrentUserId();
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

}