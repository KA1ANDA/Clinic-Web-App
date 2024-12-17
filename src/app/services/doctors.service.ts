import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Specialization } from '../models/specialization.model';
import { DayOff } from '../models/dayOff.model';


@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  doctors : Doctor[] = []

  visibleDoctors : Doctor[] = []
  searchedDoctors : Doctor[] = []
  selectedDoctor? : Doctor 
  doctorDaysOff : DayOff[] = []


  baseUrl:string = "https://localhost:7091/api/"

  constructor(private http:HttpClient) { }

  

  getDoctors(): Observable<any> {
    console.log('getDoctors called'); 
    return this.http.get<any>(`${this.baseUrl}Doctors/get_doctors`);
  }

  getDoctorsByCategoryId(specialization : Specialization):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Doctors/get_doctors_by_category_id`, specialization)
  }

  getDoctorById(id : number):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Doctors/get_doctor_by_id` , {id})
  }

  getSearchedDoctors(searchString : string):Observable<any>{
    const search = { searchString };
    return this.http.post<any>(`${this.baseUrl}Doctors/search_doctor`, search)
  }

  addDayOff(day:DayOff):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Doctors/add_day_off`,day)
  }

  getDoctorDaysOff(id : number):Observable<any>{
    const day = new DayOff(undefined, id); 
    return this.http.post<any>(`${this.baseUrl}Doctors/get_doctor_days_off` , day)
  }

  
  get Doctors () :  Doctor[] {
    return this.doctors
  } 


  set Doctors (doctorsArray : Doctor[] ) {
    this.doctors = doctorsArray
  }


  get SearchedDoctors () :  Doctor[] {
    return this.searchedDoctors
  } 


  set SearchedDoctors (searchedDoctors : Doctor[] ) {
    this.searchedDoctors = searchedDoctors
  }


  get SelectedDoctor () : Doctor | undefined {
    return this.selectedDoctor
  } 


  set SelectedDoctor (selectedDoctor : Doctor ) {
    this.selectedDoctor = selectedDoctor
  }


  get DoctorDaysOff () : DayOff[]  {
    return this.doctorDaysOff
  } 


  set DoctorDaysOff (day : DayOff[] ) {
    this.doctorDaysOff = day
  }


  get VisibleDoctors () : Doctor[]  {
    return this.visibleDoctors
  } 


  set VisibleDoctors (visibleDoctors : Doctor[] ) {
    this.visibleDoctors = visibleDoctors
  }
}
