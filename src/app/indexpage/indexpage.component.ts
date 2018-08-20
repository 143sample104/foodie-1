import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent implements OnInit {
  
  title = 'app';
  public show:boolean = false;
  public option:Set<string>;
  public buttonName:any = 'Show';
  public category:any[];
  public responseData:any;
  public listData:any;
  public searchTex:any; 
  public popup:any;
  public temp:any; 
  public ppid:Product;


  public technologies : any;
  total : number;
  product : Product[];
  updatefood:Product[];
  public itemClicked:boolean=false;
  public itemCount:number=0;
  date; //date Variable
  logedInForm; //These are variables
  emailId;
  password;
  display='none'; //default Variable
 

  count : number;
  map:boolean=false;
  constructor(public data:ApiService,public router:Router,@Inject(LOCAL_STORAGE) private storage:WebStorageService){
    this.product=new Array();
    this.updatefood=new Array();
    this.getFoods();
 
    
    }

    openModalDialog(i){
      this.display='block'; //Set block css
      //console.log('hello3');
      this.itemCount=0;
      this.popup=i;
      this.temp=i;
      console.log(i);
      console.log(this.temp);
   }
  
   closeModalDialog(){
    //console.log('hello1');
    this.itemClicked=false;
    this.display='none'; //set none css after close dialog
    //console.log('hello2');
   }


    maptoggle(){
      this.map=!this.map
    }

    enter(){
      this.router.navigate(['orderfood']); 
    }
    cart(){
      this.data.count=this.count;
        }
cartpage(){
  this.router.navigate(['cartpage'])
}

   getFoods(){
    this.data.loadData("foods").then((result)=>{
      this.responseData = result;
     // console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
        
        console.log(this.listData);
      }else {
        console.log()
      }
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
  }

  view(){
    if(this.storage.get('vicky_id')!=null){
    this.product.push(this.ppid);
    this.updatefood.push(this.temp);
    this.data.getLocal(this.product);
    this.data.getLocal1(this.updatefood);
  }else{
    alert("You must login to add items!");
  }
}

selecteditem(id){
  this.data.product_id=id;
  console.log(id);
  this.router.navigate(['buyproducts']);
}

  
  ngOnInit () { 
    console.log(this.storage.get('vicky'));
  }

  /* delpopup(pid){
    console.log(pid);
    for(var i=0;i<this.listData.length;i++){
      if(this.listData[i].id === pid)
      {  
        this.listData.splice(i,1);
      }           
    }
    this.totalPrice();
    //console.log(this.listData);
  } */
  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.listData.length;i++){
      this.total += (this.listData[i].price * this.listData[i].quantity);
    }
  }
  
  add(pid:Product){
    console.log("Hai");
    console.log("pid"+pid);
    for(var i=0;i<this.listData.length;i++){
      if(this.listData[i].id === pid.id)
      {  
        //this.listData[i].quantity += 1;
        this.itemCount++;
        this.itemClicked=true;
        pid.quantity=this.itemCount;
        this.temp.available--;
        this.ppid=pid;
      }           
    }
    this.totalPrice();
  
    
    //console.log(this.product);
    // this.view(this.product);
    // localStorage.setItem("quentinTarantino", JSON.stringify(this.product));
    // var jj=JSON.parse(localStorage.getItem("quentinTarantino"));
    // console.log("hry")
    // console.log(jj);
     
   // this.totalPrice();
    console.log("vicky");
  }
  
  del(pid){
    console.log(pid);
    for(var i=0;i<this.listData.length;i++){
      if(this.listData[i].id === pid)
      {  
        //this.listData[i].quantity -= 1;
        if(this.itemCount>0)
        this.itemCount--;
        this.itemClicked=true;
        pid.quantity=this.itemCount;
        this.temp.available++;
        this.ppid=pid;
      }           
    }
    this.totalPrice();
    //console.log(this.listData);
  }
}
