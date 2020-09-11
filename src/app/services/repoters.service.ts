import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
  
@Injectable({
  providedIn: 'root'
})
export class RepotersService {

  constructor( private http:HttpClient) { }
   public covid19Reports(){
     return this.http.get("https://api.rootnet.in/covid19-in/stats/testing/history");
   }
   public covid19Countryreport(){
     return this.http.get("https://www.trackcorona.live/api/countries");
   }
}

