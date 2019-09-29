import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IUser, IFriendRequest } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})


export class FriendsComponent implements OnInit {

  userId: string;
  allFriendsList: IFriendRequest[] = [];

  constructor(
    private _authSvc: AuthService,
    private _router: Router,
    private _db: AngularFireDatabase
  ) { }

  async ngOnInit() {
    try {
      this.userId = await this._authSvc.getCurrentUserId();
      if (this.userId) {
        await this._db.database.ref("users").once('value', (snapshot) => {
          let users = snapshot.val();
          for (let key in users) {
            const value = users[key];
            if (key != this.userId) {
              this.allFriendsList.push(<IFriendRequest>{
                id: key,
                imageUrl: value.imageUrl,
                username: value.username
              })
            }
          }
        })
        console.log('this.allFriendsList: ', this.allFriendsList);
      }
      else{
        await this._authSvc.logout();
        this._router.navigate(['login'])
      }
    } catch (error) {

    }
  }

  async sendFreiendRequest(request: IFriendRequest){
    let ref = await this._db.database.ref('users')
    .child(request.id )
    .child("friendsRequestList")
    .child(this.userId)
    .set(request)
  }

  openProfileComponent() {
    this._router.navigate(['profile'])
  }

  openHomeComponent() {
    this._router.navigate(['home'])
  }
}
