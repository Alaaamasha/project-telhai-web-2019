import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  joke:any;
  apiUrl:string;

  constructor( private _router: Router,
               private _http:HttpClient,
               private _matDialog:MatDialog) { }

  ngOnInit() {
    this.apiUrl = 'http://api.icndb.com/jokes/random';
  }

  openFriendsComponent(){
    this._router.navigate(['friends'])
  }
  
  openProfileComponent(){
    this._router.navigate(['profile'])
  }

  async makeJoke(){
    try {
    await this._http.
    get(this.apiUrl)
    .toPromise()
    .then(result=>{
      this.joke = result;
      alert(this.joke.value.joke)
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
