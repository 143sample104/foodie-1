import { Component,OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject, Observable } from 'rxjs';
import { Inject, Injector, ElementRef } from '@angular/core';
import { Product,Order } from '../product';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
  @Input() list : Subject<any>;
  // fulldetails : any[];
   product : Product[];
   response:any;
   response1:any;
   responseData:any;
   listData:any;
   rv:Order={};
   public grandtotal:number=0;
   // id : number;
   // name : string;
   // price : number;
   // image : string;
   // qua lity : number;
 
   constructor(public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService ) {
     //console.log("servi");
     this.response=this.data.respon();
     this.response1=this.data.respon1();
 
     console.error("here"+this.response);
     console.error(this.response1);
     /* this.response = this.response.filter((el, i, a) => i === a.indexOf(el))
     console.log(this.response); */
     this.toObject(this.response,this.response1);
   //   this.data1.postShop(this.response, "create").then((result) =>{
   //     var results = this.response;
   //     console.log(this.response);
   //     console.log("Successfully updated");
   //       }, (err)=> {
   //      }).catch((err) =>{
   //         console.log("Unhandled rejection",err.message);
         
   //    alert("helloo");
   // });
 
     }
      toObject(response:Product[],response1:Product[]) {
     
       // rv=this.response;
       console.log(response.length);
        for (var i = 0; i < response.length; i++){
          this.rv.product_name = response[i].name;
          this.rv.product_id=response[i].id;
          this.rv.cost=response[i].price;
          this.rv.lat=response[i].lat;
          this.rv.lon=response[i].lon;
          this.rv.zoom=response[i].zoom;
          this.rv.address=response[i].address;
          this.rv.quantity=response[i].quantity;
          this.rv.product_id=response[i].providerId;
          this.rv.provider=response[i].provider;
          this.rv.user_name='vicky';
          this.rv.user_id=this.storage.get('vicky_id');
          this.rv.tax=response[i].tax;
          this.rv.income=response[i].price;
          this.rv.status=response[i].name;
          this.rv.providerId=response[i].providerId;
          this.rv.phno=this.storage.get('vicky_phno1');
          console.log(this.rv);
         this.grandtotal+=response[i].price;
         this.storage.set('vicky_total',this.grandtotal);
         console.log("final total "+this.grandtotal);
        if(this.storage.get('vicky')){
       console.log("response1");
       console.log(response1[i]);
       this.data.postShop(this.rv, "orders/orders").then((result) =>{
              var results = this.response;
              console.log(this.response);
              console.log("Successfully updated");
                }, (err)=> {
               }).catch((err) =>{
                  console.log("Unhandled rejection",err.message);
               
             alert("helloo");
          });
          this.data.postShop(this.response1[i], "foodie/foods").then((result) =>{
            
            console.log("Successfully updated");
              }, (err)=> {
             }).catch((err) =>{
                console.log("Unhandled rejection",err.message);
             
           alert("helloo");
        });
        }else{
          this.storage.set('this.rv','cachedata');
        }
     }
     

   }

}
