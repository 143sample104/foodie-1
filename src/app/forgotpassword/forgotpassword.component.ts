import { Component, OnInit,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
public responseData: any;
public listData: any;
public username: string;
public question: string;
public answer: string;
public phno: number;
//public providerDetails1={"securityquestion":"","securityanswer":""};
//public providerDetails={"name":"", "email":"","phno":"","address":"","password":"","securityquestion":"","securityanswer":""};
  constructor(public router:Router,public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  ngOnInit() {
    //console.log(this.data.uid);
        this.data.getUsers('user/').then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
       
        for(var i=0;i<this.listData.length;i++){
          if(this.storage.get('vicky_phno')==this.listData[i].phno){
            this.question=this.listData[i].securityquestion;
            this.answer=this.listData[i].securityanswer;
            this.username=this.listData[i].name;
            this.storage.set('vicky_uname',this.listData[i].name);
          console.log(this.username);
          console.log(this.answer);           
         }else{
          console.log('you are unauthenticted');
        } 
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
  }

  //check for correct answer
submit(e){
  e.preventDefault();
  var answer=e.target.elements[0].value;
  console.log(answer);
  //var username =e.target.elements[1].value;
    if(answer==this.answer){
     alert("you are allowed to change password");
     this.router.navigate(['updatepassword']);
   }else{
    console.log('you are unauthenticted');
    alert("you are not allowed to change password");
  }
}
}
