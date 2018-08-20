

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';

let apiURL = "http://192.168.1.50:8080/foodie/";
let apiURL1 = "http://192.168.1.50:8080/users/";
let apiURL2 = "http://192.168.1.50:8080/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public result1;id:any
  public count : number
  public userLoggedIn;
  public adminLoggedIn;
  public username:any;
  public product_id:any;
  public user_id:any;
  public phno;
  public result:any;
  constructor(public http: HttpClient) {
    console.log('Hello Api Service');
    this.adminLoggedIn=false;
    this.userLoggedIn=false;
  }

  // setUserSession(userData,userStatus){

    
  // }


  loadData(type){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders();
      this.http.get(apiURL+type, {headers: headers}).
      subscribe(res =>{
       resolve(res);
      },(err)=>{
        reject(err);
      });
    });
  }

  PostDetails(type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      //headers.append("Content-Type","application/json");
     
      this.http.get(apiURL+type,{headers:headers}).
      subscribe (data =>{
        console.log("success");
        console.log(this.result1);
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
  }
  updateDetails(details,type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      //headers.append("Content-Type","application/json");
      console.log(details);
      this.http.put(apiURL2+type,details,{headers:headers}).
      subscribe (data =>{
        console.log(this.result1);
        console.log("success");
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
  }
  deleteDetails(type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      //headers.append("Content-Type","application/json");
      this.http.delete(apiURL+type,{headers:headers}).
      subscribe (data =>{
        console.log(this.result1);
        console.log("success");
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
  }

  getLocation(type: string) {
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      //headers.append("Content-Type","application/json");
     
      this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + type + 'CA&sensor=false',{headers:headers}).
      subscribe (data =>{
        console.log("success");
        console.log(this.result1);
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
   /*  return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + term + 'CA&sensor=false')
         .toPromise()
         .then((response) => Promise.resolve(response.json()));
         .catch((error) => Promise.resolve(error.json()));
 */ }
 public getLocal(p){
  console.log("mano");
  localStorage.setItem("quentinTarantino", JSON.stringify(p));
  this.respon();
}
public getLocal1(p){
  console.log("mano");
  localStorage.setItem("foods", JSON.stringify(p));
  this.respon();
}
public respon(){
  var jj=JSON.parse(localStorage.getItem("quentinTarantino"));
  return jj;
}

public respon1(){
  var jj=JSON.parse(localStorage.getItem("foods"));
  return jj;
}


public postShop(details,type){
  return  new Promise((resolve,reject)=>{
    let headers=new HttpHeaders();
    this.http.post(apiURL2+type,details,{headers:headers}).
    subscribe(res=>{
      resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

postDetails(details,type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    console.log(details);
    this.http.post(apiURL1+type,details,{headers:headers}).
    subscribe (data =>{
      console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}
// getAdmin(details,type){
//   return new Promise((resolve , reject) =>{
//     let headers =new HttpHeaders();
//     //headers.append("Content-Type","application/json");
//     console.log(details);
//     this.http.get(apiURL1+type,details).
//     subscribe (data =>{
//       console.log(this.result1);
//       console.log("success");
//       resolve(data);
//     },(err)=>{
//       reject(err);  
//     });
//   });

// }

getUsers(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiURL1+type, {headers: headers}).
    subscribe(res =>{
     resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

getUsersById(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiURL1+type, {headers: headers}).
    subscribe(res =>{
     resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

//get orders list
getOrders(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiURL2+type, {headers: headers}).
    subscribe(res =>{
     resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

//get user orders
getUserOrders(details,type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    console.log(details);
    this.http.post(apiURL2+type,details,{headers:headers}).
    subscribe (data =>{
      //console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}

//change order address
changeAddress(details,type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    console.log(details);
    this.http.post(apiURL2+type,details,{headers:headers}).
    subscribe (data =>{
      //console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}

setAdminLoggedIn(){
  this.adminLoggedIn=true; 
}
getAdminLoggedIn(){
  return this.adminLoggedIn;
}
setUserLoggedIn(){
  this.userLoggedIn=true; 
}
getUserLoggedIn(){
  return this.userLoggedIn;
}

}
