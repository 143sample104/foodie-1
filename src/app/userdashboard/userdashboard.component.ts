import { Component, OnInit,Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  responseData:any;
  listData: any;
  ordersList:any;
  public uid:string;
  public orderData:any;
  updateDetails={"name":"", "email":"","phno":"","address":"","password":"","securityquestion":"","securityanswer":""};
  updateDetails1 = {"confirmpassword":""};
 
  constructor(public data:ApiService,public router:Router,@Inject(LOCAL_STORAGE) private storage:WebStorageService,public location:Location) {
    console.log(this.data.user_id);

   }

  ngOnInit() {
   this.uid=this.storage.get('vicky_id');
   console.log(this.uid);
   this.getUser();
   this.getUserOrders();
  }

//get user details
  getUser(){
    this.data.getUsersById('user/'.concat(this.uid)).then((result)=>{
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData) {
       
       this.listData=this.responseData;
       console.log(this.listData);
      }else {
        console.log();
      }
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
    
  }
//get user orders
getUserOrders(){
  var uid=this.storage.get('vicky_id');
  console.log(uid);
     this.data.getUserOrders(uid,'orders/orderFilter').then((result)=>{
        this.orderData = result;
        console.log(this.orderData);
        //this.product=this.orderData[0];
        console.log(this.orderData);
      }, (err) => {
          console.log("Rejection");
      }).catch((err)=>{
        console.log('unHandledRejection', err.message);
      });
  }

//update user by id

updateProfile(){
console.log(this.uid);
if(this.updateDetails!=null){
    if(this.updateDetails.password==this.updateDetails1.confirmpassword){
          this.data.updateDetails(this.updateDetails,'users/user/'.concat(this.uid)).then((result)=> {
            console.log("success");
          },(err)=>{
            console.log();
      }).catch((err)=>{
            console.log("unhandled rejection",err.message);
         });
         alert("Your profile update successfully");
         this.router.navigate(['/']);
    }else{
      alert("password not match");
    }
  }else{
    alert("Enter the details and proceed!");
  }
}

logout(){
  this.data.userLoggedIn=false;
  localStorage.clear();
  location.reload(true);
  this.router.navigate(['/']);
}

}
