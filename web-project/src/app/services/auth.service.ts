import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currUser:any;

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

  async getCurrentUser(){
    const user = await this._afAuth.auth.currentUser;
    let currUser;
    if(user){
      return user.uid
      // let ref = this._afDB.database.ref('users');
      // ref.child(user.uid).once('value',(data)=>{
      //   this.currUser = {
      //     email:data.val().email,
      //     username:data.val().username,
      //     imageUrl:data.val().imageUrl,
      //     friendsList: data.val().friendsList ?data.val().friendsList:[] ,
      //     friendsRequestList : data.val().friendsRequestList ? data.val().friendsRequestList:[],
      //     posts:data.val().posts ? data.val().posts:[] 
      //   }
      // })
    }
    return null;
  }

  saveUserDetails(){

  }

}
