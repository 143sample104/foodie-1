import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
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

export class FilterPipe implements PipeTransform {
  

   transform(items: any[], searchTex: string): any[] {
    if(!items) return [];
    if(!searchTex) return items;
searchTex = searchTex.toLowerCase();
return items.filter( it => {
      return (it.address.toLowerCase().includes(searchTex))||(it.name.toLowerCase().includes(searchTex));
    });
   }
}