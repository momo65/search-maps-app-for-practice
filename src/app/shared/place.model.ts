export class Place{
  name:string;
  lat:number;
  lng:number;
  phoneNumber:string;
  icon:string;
  types:string[];
  vicinity:string;

  constructor(name:string,lat:number,lng:number,phoneNumber:string,icon:string,types:string[],vicinity:string){
    this.name=name;
    this.lat=lat;
    this.lng=lng;
    this.phoneNumber=phoneNumber;
    this.icon=icon;
    this.types=types;
    this.vicinity=vicinity;
  }
}
