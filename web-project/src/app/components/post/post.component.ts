import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';
import { v4 as uuid } from 'uuid';
// import { getRandomString } from 'selenium-webdriver/safari';


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
    private _authSvc:AuthService
    ) {}

  async ngOnInit() {
    this.userId = await this._authSvc.getCurrentUserId();
  }

  async rax(){
    let random = Math.floor(Math.random())%50;
    let ref = await this._afDB.database.ref('users')
    .child(this.userId)
    .child("posts")
    .child(uuid())
    .set("asd is ::"+random);
    this.dialogRef.close();
  }
}
