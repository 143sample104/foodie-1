import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  show:boolean=false;
  show1:boolean=false;

  public isUserLoggedOut:boolean=true;
  constructor(public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService ) { 
    //localStorage.clear();
       //this.isUserLoggedOut=true;
    }
  
  
  ngOnInit(){
    console.log(this.storage.get('vicky'));
    if(this.storage.get('vicky')){
      console.log(this.data.username);
      this.isUserLoggedOut=false;
    }
  }
}
