import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  public searchText:any;
  result;item;productDetails;id:any
    providerDetails={
      "name": "",
      "img": "",
      "category": "",
      "breakfast":"" ,
      "lunch": "",
      "dinner": "",
      "rating": "",
      "lon": "",
      "lat": "",
      "zoom": "",
      "address": "",
      "price": "",
      "quantity": "",
      "available": "",
      "providerId": "",
      "provider": "",
      "tax": ""
    };
    constructor(public data:ApiService,public router:Router) {
      this.data.loadData("foods").then((result)=> {
      
        this.data.result=result;
        //console.log(this.data.result);
        this.sam();
       },(err)=>{
     
       }).catch((err)=>{
         console.log("unhandled rejection",err.message);
         });
     }
     sam()
     {
      this.result=this.data.result;
      //console.log(this.result);
     }
    save()
    {
      this.data.postDetails(this.providerDetails,'food').then((result)=> {
      console.log("success");
      this.router.navigate(['main']);
    },(err)=>{
      alert("Please Enter The valid Data or Fill All The Columns");
    }).catch((err)=>{
      
      console.log("unhandled rejection",err.message);
      
      });
    }

    clickMethod(ld) {
      if(confirm("Are you sure to delete that product    "+ld.name+"   in the brand of "+ld.brandName )) {
        this.id=ld.id;
    this.data.deleteDetails('foods/'.concat(this.id)).then((result)=> {
      console.log("success");
this.router.navigate(['main']);


        // this.data.getDetails('textile/Chennai').then((result)=> {
        
        //   this.data.result=result;
        //   //console.log(this.data.result);
        //   this.sam();
        //  },(err)=>{
      
        //  }).catch((err)=>{
        //    console.log("unhandled rejection",err.message);
        //    });
      
    },(err)=>{
  
    }).catch((err)=>{
      console.log("unhandled rejection",err.message);
      });
      }
    }
  //   image(event)
  //   {
  // this.providerDetails.img=event.target.value;
  
  // }
  
  ngOnInit() {
  }

    }
    
  
      
  
  
  

   

  



