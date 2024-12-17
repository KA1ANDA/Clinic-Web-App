import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { ActivationCode } from '../models/activationCode.model';
import { User } from '../models/user.model';




@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl:string = "https://localhost:7091/api/"

  constructor( private http : HttpClient) { }


  addPatient(patient : User) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Patients/add_patient` , patient)
  }

  addDoctor(doctor : Doctor) : Observable<any>{
    const formData: FormData = new FormData();

    formData.append('firstName', doctor.firstName ?? '');
    formData.append('lastName', doctor.lastName ?? '');
    formData.append('email', doctor.email ?? '');
    formData.append('password', doctor.password ?? '');
    formData.append('personalNumber', doctor.personalNumber ?? '');
    formData.append('specializationId', doctor.specializationId?.toString() ?? '');

    formData.append('activationCode',  '');
    if(doctor.cv){
      formData.append('cv', doctor.cv, doctor.cv.name);
    }

    if(doctor.photo){
      formData.append('photo', doctor.photo, doctor.photo.name);
    }

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });


    return this.http.post<any>(`${this.baseUrl}Doctors/add_doctor` , formData )
  }


  addActivationCode(activationCodeData: ActivationCode) : Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Patients/add_activation_code` , activationCodeData).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.message || "An error occurred while adding code.";
        return throwError(() => new Error(errorMessage));
      }))
  }

}
