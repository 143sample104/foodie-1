import { Pipe, PipeTransform } from '@angular/core';

import { MapComponent } from './map/map.component';

@Pipe({
  name: 'map'
})

// export class FilterPipe implements PipeTransform {
//   transform(items:any[], nameSearch: string, locationSearch: string){
//       if (items && items.length){
//           return items.filter(item =>{
//               if (nameSearch && item.cname.toLowerCase().indexOf(nameSearch.toLowerCase()) === -1){
//                   return false;
//               }
//               if (locationSearch && item.response.toLowerCase().indexOf(locationSearch.toLowerCase()) === -1){
//                   return false;
//               }
//               return true;
//          })
//       }
//       else{
//           return items;
//       }
//   }
// }

export class MapPipe implements PipeTransform {
    constructor(private map:MapComponent){}
  

   transform(items: any[], distance: number): any[] {
    if(!items) return [];
    if(!distance) return items;
//searchTex = searchTex.toLowerCase();
return items.filter( it => {
      return this.isShow(distance,this.map.loc.lat,this.map.loc.lng,it.lat,it.lng);
    });
   }

   isShow(distance:number,clat:number,clng:number,lat:number,lng:number){
       console.log("map Filter");
       console.log(distance+' '+clat+' '+clng+' '+lat+' '+lng);


       var R = 6371; // Radius of the earth in km
       var dLat = this.deg2rad(lat-clat);  // deg2rad below
       var dLon = this.deg2rad(lng-clng); 
       var a = 
         Math.sin(dLat/2) * Math.sin(dLat/2) +
         Math.cos(this.deg2rad(clat)) * Math.cos(this.deg2rad(lat)) * 
         Math.sin(dLon/2) * Math.sin(dLon/2)
         ; 
       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
    console.log(d);

    if(d<distance)
    {console.log(true);
    return true;
    
    }
    else{
    console.log(false);
       return false;
    }
   }
   deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}