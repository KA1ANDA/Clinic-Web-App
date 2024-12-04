import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialization } from '../models/specialization.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorSpecializationsService {

  specializations : Specialization[] = [];

  baseUrl:string = "https://localhost:7091/api/"

  constructor( private http : HttpClient) { }

  getSpecializations () : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}Specializations/get_specializations`)
  }


  get Specializations () :  Specialization[] {
    return this.specializations
  } 


  set Specializations (specializationsArray : Specialization[] ) {
    this.specializations = specializationsArray
  }

}
