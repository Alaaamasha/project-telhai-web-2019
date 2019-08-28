import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  showToolbar : boolean ;
  constructor(public aFire : AngularFireAuth){ 
  }

  login(email:string , password:string):boolean {
    this.aFire.auth.signInWithEmailAndPassword(email,password).then(()=>{
      console.log("succcccccccc Login");
      this.showToolbar = false;
      return true;
    })
    return false;
  }

  register(email:string , password:string):boolean{
    this.aFire.auth.createUserWithEmailAndPassword(email,password).then(()=>{
      console.log("succcccccccc Register");
      this.showToolbar = false;
      return true;
    })
    return false;
  }
}
