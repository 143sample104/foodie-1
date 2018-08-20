import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
//import { ApiService } from './api.service';
import { ApiService } from './../api.service';

import { AppComponent } from './../app.component';

@Component({
selector: 'app-map',
templateUrl: './map.component.html',
styleUrls: ['./map.component.css']
})






export class MapComponent implements OnInit {
count:number;

public loc={"lat":11.2172508,"lng":77.487367};
public radius;
public listData:any[];
public responseData:any;
public length:number;
public searchTex:string;




constructor(public data:ApiService,public mapc:AppComponent){
this.getFoods();
this.findLocation();
//this.searchTex=this.mapc.searchTex;
//console.log(this.length);

}


setLocations(){
console.log(this.length);

for(let c of this.listData){
console.log(c);
this.markers.push({
lat:c.lat,
lng:c.lon ,
name:c.name,

draggable: false})
}
this.count=10000;

}
ngOnInit(){
 
}
// google maps zoom level
zoom: number = 12;

// initial center position for the map
lat: number = 11.2172508;
lng: number = 77.487367;

clickedMarker(label: string, index: number) {
console.log(`clicked the marker: ${label || index}`)
}

mapClicked($event: MouseEvent) {
this.markers.push({
lat: $event.coords.lat,
lng: $event.coords.lng,
draggable: true
});
}

markerDragEnd(m: marker, $event: MouseEvent) {
console.log('dragEnd', m, $event);
}

markers: marker[] = [

];


getFoods(){
this.data.loadData("foods").then((result)=>{
this.responseData = result;
console.log(this.responseData);
if (this.responseData) {
this.listData = this.responseData;
this.length=this.listData.length;
console.log(this.length);
this.setLocations();
}else {
console.log()
}
}, (err) => {
console.log("Rejection");
}).catch((err)=>{
console.log('unHandledRejection', err.message);
});
}

add(){

this.count=this.count+1000;
console.log(this.count);
}

sub(){
//--this.count;
this.count=this.count-1000;
console.log(this.count);
}

findLocation(): void {
  this.data.getLocation("palayakadu,tirupur")
      .then((result)=>{
        console.log( result);
        if (result) {
        
        console.log(result);

        }else {
        console.log()
        }
        }, (err) => {
        console.log("Rejection");
        }).catch((err)=>{
        console.log('unHandledRejection', err.message);
        });
}



// Geo Location

 findMe() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition((position) => {
this.showPosition(position);
});
} else {
alert("Geolocation is not supported by this browser.");
}
}


//Geo Tracking

/* trackMe() {
if (navigator.geolocation) {
this.isTracking = true;
navigator.geolocation.watchPosition((position) => {
this.showTrackingPosition(position);
});
} else {
alert("Geolocation is not supported by this browser.");
}
} */



 showPosition(position) {
this.loc.lat = position.coords.latitude;
this.loc.lng = position.coords.longitude;
console.log(this.loc.lat+' '+this.loc.lng);


}

/* showTrackingPosition(position) {
console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
this.currentLat = position.coords.latitude;
this.currentLong = position.coords.longitude;

let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
this.map.panTo(location);

if (!this.marker) {
this.marker = new google.maps.Marker({
position: location,
map: this.map,
title: 'Got you!'
});
}
else {
this.marker.setPosition(location);
}
} */

}



// just an interface for type safety.
interface marker {
lat: number;
lng: number;
name?: string;
draggable: boolean;
}
