import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  joke:any;
  apiUrl:string;

  constructor( private _router: Router,
               private _http:HttpClient) { }

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

}
