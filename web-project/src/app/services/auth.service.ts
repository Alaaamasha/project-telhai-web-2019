import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { IUser } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser:IUser;
  allUsers:IUser[];

  constructor(private _afAuth : AngularFireAuth,
              private _afDB: AngularFireDatabase,
              private _afST: AngularFireStorage
              ){ 
  }

  async login(email:string , password:string){
    await this._afAuth.auth.signInWithEmailAndPassword(email,password).
    then(()=>{
    })
  }

  async register(frmVal,file){
    await this._afAuth.auth.createUserWithEmailAndPassword(frmVal.email,frmVal.password).
    then((data)=>{
      let user = {
        email:frmVal.email,
        // id:data.user.uid,
        username:frmVal.username,
        imageUrl:frmVal.imageUrl
      };
      let ref = this._afDB.database.ref('users');
      ref.child(data.user.uid).set(user);
     
      const storageRef = this._afST.ref("users-images");
      storageRef.child(data.user.uid).put(file);
      
    })


    return false;
  }

  async getCurrentUserId(){
     const user= await this._afAuth.auth.currentUser; 
    return user.uid;
  }

  async initCurrUserData(){
    try {
        const user = await this._afAuth.auth.currentUser;
        await this._afDB.database.ref("users").once('value', (snapshot) => {
        let users = snapshot.val();
        for (let key in users) {
          if(key === user.uid){
            const value = users[key];
            let currUser = <IUser>{
              email:value.email,
              friendsList: value.friendsList ? value.friendsList:[],
              friendsRequestList: value.friendsRequestList ? value.friendsRequestList:[],
              id:key,
              imageUrl:value.imageUrl,
              posts:value.posts ? value.posts : [],
              username : value.username
            }
            this.set(currUser);
          }
        
        }}
        )
    } catch (err) {
      console.error(err);
    }
  }

  
  async logout(){
    try {
      await this._afAuth.auth.signOut();
    } catch (error) {
      console.error(error);
      
    }
  }

  get(){
    return this.currUser;
  }

  set(usr : IUser){
    this.currUser = usr ;
  }

  getAllUsers(){
    return this.allUsers;
  }

  setAllUsers(users :IUser[]){
    this.allUsers = users;
  }

}
