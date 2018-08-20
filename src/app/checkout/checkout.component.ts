import { Component, OnInit,AfterViewChecked,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
declare let paypal: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public responseData: any;
  public listData: any;
  public orderData:any;
  public product={"order_id":"","user_id":"","product_id":"","product_name":"","user_name":"","lon":"","lat":"","zoom":"","address":"","cost":"","income":"","quantity":"","providerId":"","provider":"","status":"","tax":"","createdAt":"","updatedAt":""};
  public address:String;
  newaddress:boolean=false;
  show:boolean=false;
  show1:boolean=false;
  public providerDetail1={"address":""};
  isLoggedOut:boolean=true;
  public username:string;
  public total:number=0;
  public total1:number=0;
  public tax:number=0;
  public finalAmount:number;
  constructor(public router:Router,public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) {
   
    //getting user status
   if( this.storage.get('vicky')){
     this.isLoggedOut=false;
   }
   }

  ngOnInit() {
    //get total and tax
    this.total1=this.storage.get('vicky_total');
    this.tax=((this.total1)/(100))*10;
    this.total=this.tax+this.total1+30;
    this.finalAmount= this.total;

    //getting pre given address
    this.username=this.storage.get('vicky_uname');
    this.data.getUsers('user/').then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
       
        for(var i=0;i<this.listData.length;i++){
          if(this.username==this.listData[i].name){
            this.address=this.listData[i].address;
            
          console.log(this.address);           
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
    this.getUserOrders();
  }
  //new address show or hide
  addrtoggle() {
    this.newaddress = !this.newaddress;
   }

   //login and signup toggle
   logintoggle(){
     this.show=!this.show;
     this.show1=false
   }

   signuptoggle(){
    this.show1=!this.show1;
    this.show=false
  }

  //new adress add
  changeaddr(){
    console.log(this.providerDetail1);
    this.data.changeAddress(this.providerDetail1,'orders/changeAddress').then((result)=> {
      console.log("success");
      //console.log(this.data.uid);
      //console.log(this.providerDetails.password);
      //this.router.navigate(['login']);
      alert("Your order address changed successfully");
      this.address=this.providerDetail1.address;
    },(err)=>{
  
    }).catch((err)=>{
      console.log("unhandled rejection",err.message);
      });
  }

//get orders
getUserOrders(){
var uid=this.storage.get('vicky_id');
console.log(uid);
   this.data.getUserOrders(uid,'orders/orderFilter').then((result)=>{
      this.orderData = result;
      //this.product=this.orderData[0];
      console.log(this.orderData);
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
}


  //  payment tab
  addScript: boolean = false;
  paypalLoad: boolean = true;
  // finalAmount: number= this.total;
  paypalConfig = {
    env: 'sandbox',
    style: {
      label: 'buynow',
      fundingicons: true, // optional
      branding: true, // optional
      size:  'small', // small | medium | large | responsive
      shape: 'rect',   // pill | rect
      color: 'gold'   // gold | blue | silver | black
  },
    client: {
      sandbox: 'AZOydPphjOEGhm-gS8iPiBdESForP9ExEeUsUXQkOg4Y_TM97VH9ZKUrpUbkt_ePXbmCEm1wVC1-2vHm',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        alert('your transaction is successful');
        //localStorage.clear();
        this.router.navigate(['/']);
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
 

}
