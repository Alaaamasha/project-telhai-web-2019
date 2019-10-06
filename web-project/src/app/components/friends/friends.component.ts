import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
              
              this.allFriendsList.push(<IFriendRequest>{
                id: key,
                imageUrl: value.imageUrl,
                username: value.username,
                friendStatus : (foundFriend==true)?"We Are Friends":(foundFriendRequest==true ? "Sended/Recived Frriend Request":"Add Friend") 
              })
            }
          }
        })
      }
      else{
        await this._authSvc.logout();
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
        .set(this.currUersRequest)
        let idx = this.allFriendsList.findIndex(item => item.id==request.id)
        this.allFriendsList[idx].friendStatus = "Sended/Recived Frriend Request";
      } 
      catch (error) {
        console.error(error)
      }
    }
    else{
      alert("You Cant Add This Friend")
    }
  }

  openProfileComponent() {
    this._router.navigate(['profile'])
  }

  openHomeComponent() {
    this._router.navigate(['home'])
  }
}
