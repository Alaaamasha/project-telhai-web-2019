import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../interfaces';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currUser:IUser;

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
      this._currUser = {
        email:frmVal.email,
        // id:data.user.uid,
        username:frmVal.username,
        imageUrl:frmVal.imageUrl
      };
      let ref = this._afDB.database.ref('users');
      ref.child(data.user.uid).set(this._currUser);
     
      const storageRef = this._afST.ref("users-images");
      storageRef.child(data.user.uid).put(file);
      
    })


    return false;
  }

  getCurrentUser(){
    // console.log(this._afAuth.auth.currentUser);
    const user = this._afAuth.auth.currentUser;
    let _currUser
    if(user){
      let ref = this._afDB.database.ref('users');
      ref.child(user.uid).once('value',(data)=>{
        _currUser : <IUser>{
          email:data.val().email,
          username:data.val().username,
          imageUrl:data.val().imageUrl
        } 
      })
      return _currUser;
    }
    // return this._currUser? this._currUser:null;
  }

  saveUserDetails(){

  }

}
