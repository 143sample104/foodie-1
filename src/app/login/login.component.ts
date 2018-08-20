import { Component, OnInit,Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { AlertPromise } from 'selenium-webdriver';
import { NavbarComponent } from '../navbar/navbar.component';
import{ Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public responseData: any;
  public listData: any;
  public uId:string="1";
  public username:any;
  public success:boolean=false;


  public providerDetail1 = {"phno":""};
  display="none";
  forgotsttaus:boolean=false;
  constructor(public data:ApiService,public router:Router,@Inject(LOCAL_STORAGE) private storage:WebStorageService, public nav:NavbarComponent,public location:Location) { }

  ngOnInit() {
  }

  login(e){
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
     
     console.log(username);
     //this.data.username=username;
    this.data.getUsers('user/').then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
       //console.log(this.listData);
        for(var i=0;i<this.listData.length;i++){
          if(username==this.listData[i].name && password==this.listData[i].password){
            this.data.username=this.listData[i].name;
            this.data.phno=this.listData[i].ph_no;
            this.success=true;
           //console.log("hey dude");
           if(this.uId==this.listData[i].uid){
            this.data.setAdminLoggedIn();
            this.nav.ngOnInit();
            this.router.navigate(['adminpage'])
            alert("Hello Admin Welcome");
           }else{
            this.data.setUserLoggedIn();
            this.data.user_id=this.listData[i].uid;
           // this.data.username=this.listData[i].name;
           // user details set to local storage
           this.storage.set('vicky' , this.listData[i]);
           this.storage.set('vicky_uname' , this.listData[i].name);
           //user id set to local storage
           this.storage.set('vicky_id',this.listData[i].uid);
           //user phno set to local storage for orders purpose
           this.storage.set('vicky_phno1',this.listData[i].phno);
            console.log(this.storage.get('vicky'));
            window.location.reload(true);
            this.router.navigate(['userdashboard'])
            // this.router.navigateByUrl('/nav', {skipLocationChange: true}).then(()=>
            // this.router.navigate(["/"]));
            //alert("hai");
           }
           //alert('your details are wrong');
         }else{
          console.log('you are unauthenticted');
        } 
        }
        if(this.success==false){
          alert('login failed');
        }
        //console.log(this.listData);
      }else {
        console.log('no data is get');
      }
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
    // alert(username);
    // return false;
   
   //this.data.username=this.username1;
  // console.log(this.data.username);
  }
// for forgot password
  openModalDialog(){
    this.display='block'; //Set block css
    //console.log('hello3');
    //this.popup=i;
    console.log("hey dude");
 }

 closeModalDialog(){
  //console.log('hello1');
  this.display='none'; //set none css after close dialog
  console.log('hello2');
 }

// For send mob number

submit(){
  this.data.getUsers('user/').then((result)=>{
    this.responseData = result;
    //console.log(this.responseData);
    if (this.responseData) {
      this.listData = this.responseData;
      console.log(this.listData);
      for(var i=0;i<this.listData.length;i++){
        if(this.providerDetail1.phno==this.listData[i].phno){
         console.log(this.providerDetail1.phno);
         this.storage.set('vicky_phno',this.providerDetail1.phno);
         this.username=this.listData[i].name;
         console.log(this.listData[i].phno);
        // this.data.username=this.listData[i].name;
         //this.data.uid=this.listData[i].uid;
         this.forgotsttaus=true;
          this.router.navigate(['forgotpassword']);
          //alert("hey cool man");
       }else{
        console.log('you are unauthenticted');
      } 
      }
      if(this.forgotsttaus==false){
        alert("Check your phone number");
      }
    }else {
      console.log('no data is get');
    }
  }, (err) => {
      console.log("Rejection");
  }).catch((err)=>{
    console.log('unHandledRejection', err.message);
  });
}
}
