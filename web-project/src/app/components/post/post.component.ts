import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  userId: string;

  constructor(
    public dialogRef: MatDialogRef<PostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _afDB:AngularFireDatabase,
    private _authSvc:AuthService) {}

  ngOnInit() {
  }

  async rax(){
    this.userId = await this._authSvc.getCurrentUserId();
    let ref = await this._afDB.database.ref('users').child(this.userId)
    .child("posts").child("1").set("asd is goooooooooooood");
    this.dialogRef.close();
  }
}
