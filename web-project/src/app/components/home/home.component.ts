import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _router: Router) { }

  ngOnInit() {
    
  }

  openFriendsComponent(){
    this._router.navigate(['friends'])
  }
  
  openProfileComponent(){
    this._router.navigate(['profile'])
  }

}
