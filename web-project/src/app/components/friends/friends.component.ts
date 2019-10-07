import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IUser, IFriendRequest } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { FriendsRequestsComponent } from '../friends-requests/friends-requests.component';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})


export class FriendsComponent implements OnInit {

  userId: string;
  allFriendsList: IFriendRequest[] = [];
  currUersRequest:IFriendRequest = null;
  _currUser: IUser = null;


  constructor(
    private _authSvc: AuthService,
    private _router: Router,
    private _db: AngularFireDatabase,
    private _matDialog:MatDialog,
    private _route: ActivatedRoute

  ) { }

  async ngOnInit() {
  
    try {
      this._currUser = this._authSvc.get();
      if (this._currUser.id) {
        
        let requestsList = this._currUser.friendsRequestList ? 
        Object.keys(this._currUser.friendsRequestList).map(key => ({id: key, value: this._currUser.friendsRequestList[key]})):[];  
        
        let friendssList = this._currUser.friendsList ? 
        Object.keys(this._currUser.friendsList).map(key => ({id: key, value: this._currUser.friendsList[key]})):[];
        
        await this._db.database.ref("users").once('value', (snapshot) => {
          let users = snapshot.val();
          for (let key in users) {
            const value = users[key];
            if (key != this._currUser.id) {
              let foundFriend = friendssList.some(item => item.id===key);
              let foundFriendRequest = requestsList.some(item => item.id===key);
              if((foundFriendRequest == false && value.status!='sent') || foundFriend == true ){
                const status = foundFriend == true ? "We Are Friends":"Add Friend";
                this.allFriendsList.push(<IFriendRequest>{
                  id: key,
                  imageUrl: value.imageUrl,
                  username: value.username,
                  friendStatus : status
                })
              }
            }
          }
        })
      }
      else{
        await this._authSvc.logout();
        this._authSvc.set(null);
        this._router.navigate(['login'])
      }
    } catch (error) {
      console.error(error);
    }
  }

  openFriendsRequests(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height='400px';
    dialogConfig.width='700px';
    let dialog = this._matDialog.open(FriendsRequestsComponent,dialogConfig)
    dialog.afterClosed().subscribe(res=>{
      
    })
  }

  async sendFreiendRequest(request: IFriendRequest){
    if(request.friendStatus == "Add Friend"){
      try {
         await this._db.database.ref('users')
        .child(request.id )
        .child("friendsRequestList")
        .child(this._currUser.id)
        .set(<IFriendRequest>{
          id: this._currUser.id,
          imageUrl: this._currUser.imageUrl,
          username: this._currUser.username,
        })

        await this._db.database.ref('users')
        .child(request.id )
        .child('status')
        .set('sent')

        let idx = this.allFriendsList.findIndex(item => item.id==request.id)
        this.allFriendsList.splice(idx,1);
      } 
      catch (error) {
        console.error(error)
      }
    }
    else{
      alert("Already Friends");
      return;
    }
  }

  openProfileComponent() {
    this._router.navigate(['profile'])
  }

  openHomeComponent() {
    this._router.navigate(['home'])
  }
}
