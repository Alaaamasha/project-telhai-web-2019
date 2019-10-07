import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuid } from 'uuid';
import { IPost, IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  _currUser: IUser;
  text_post : string='';

  constructor(
    public dialogRef: MatDialogRef<PostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _afDB:AngularFireDatabase,
    private _authSvc:AuthService
    ) {}

  async ngOnInit() {
    this._currUser =  this._authSvc.get();
  }

  async Post(){
    if(this.text_post==''){
      alert("You cant write an empty post");
      return;
    }
     await this._afDB.database.ref('users')
    .child(this._currUser.id)
    .child("posts")
    .child(uuid())
    .set(<IPost>{
      imageUrl : this._currUser.imageUrl,
      text: this.text_post,
      username:this._currUser.username
    });
    this.dialogRef.close();
  }
}
