import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  providerDetails={"name":"", "email":"","phno":"","address":"","password":"","securityquestion":"","securityanswer":""};
  providerDetail = {"confirmpassword":""};
  public listData:any;
  public count:number=0;
  public responseData:any;
  constructor(public router:Router,public data:ApiService, public nav:NavbarComponent) { }

  ngOnInit() {
//check phone number already
    this.data.getUsers('user/').then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
        console.log(this.listData);
      }else {
        console.log('no data is get');
      }
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
  }

  signup(){
    console.log(this.providerDetails.securityanswer);
    console.log(this.providerDetails);
    if(this.providerDetails.password==this.providerDetail.confirmpassword){
      if(this.phonenoValidate()){
      alert('your details are updated');
      console.log(this.providerDetails);
      this.data.postDetails(this.providerDetails,'user').then((result)=> {
        console.log("success");
      },(err)=>{
    
      }).catch((err)=>{
        console.log("unhandled rejection",err.message);
        });
       this.router.navigate(['/']);
      }else{
      alert('Phone number already exists');
    } 
  }
  else{
        alert("Password mismatch");
  }
  }

  forgotpassword(){
    
    this.router.navigate(['enterdetails']);
  }

phonenoValidate():boolean{
    for(var i=0;i<this.listData.length;i++){
      if(this.providerDetails.phno==this.listData[i].phno){
        //number match
        this.count++;
      }
    }
    if(this.count==0){
      //numbser not exist
      return true;
    }
    else{
      //number exists
      return false;
    }
}

}
