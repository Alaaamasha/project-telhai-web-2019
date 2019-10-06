import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { PostComponent } from '../post/post.component';
import { IUser } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _joke:any;
  _apiUrl:string;
  _userId:string;
  allFriendsList: IUser[] = [];
  _currentUser:IUser = null;
  friendsPostsList:[] = []

  constructor( private _router: Router,
               private _http:HttpClient,
               private _matDialog:MatDialog,
               private _authSvc:AuthService,
               private _db: AngularFireDatabase
               ) { }

  async ngOnInit() {
    try {
      this._userId =  await this._authSvc.getCurrentUserId();
      await this._db.database.ref("users").once('value', (snapshot) => {
        let users = snapshot.val();
        for (let key in users) {
          const value = users[key];
          this.allFriendsList.unshift(<IUser>{
            email:value.email,
            friendsList: value.friendsList ? value.friendsList:[],
            friendsRequestList: value.friendsRequestList ? value.friendsRequestList:[],
            id:key,
            imageUrl:value.imageUrl,
            posts:value.posts ? value.posts : [],
            username : value.username
          })
          if(this._userId == key){
           this._currentUser = this.allFriendsList[0];
          }
        }
       })
       this._authSvc.set(this._currentUser);
       this.allFriendsList.forEach(usr=>{
        if(usr.posts){
          for(let key in usr.posts){
            this.friendsPostsList.push(usr.posts[key]);   
          }

        }
      })
       this._apiUrl = 'http://api.icndb.com/jokes/random';

    } 
    catch (error) {
      console.error(error)  
    }
    
  }

  openFriendsComponent(){
    this._router.navigate(['friends'])
  }
  
  openProfileComponent(){
    // this._router.navigate(['profile',{user : JSON.stringify(this._currentUser)}])
    this._router.navigate(['profile'])
  }

  async makeJoke(){
    try {
    await this._http.
    get(this._apiUrl)
    .toPromise()
    .then(result=>{
      this._joke = result;
      alert(this._joke.value.joke)
    })
    } catch (error) {
      console.error(error);
    } 
  }

  writePost(){
    let dialog = this._matDialog.open(PostComponent,{
      width:'700px',height:'400px'
    })
    dialog.afterClosed().subscribe(res=>{
      
    })
  }

}
