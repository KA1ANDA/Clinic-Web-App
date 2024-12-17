import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Authentication } from '../models/authentication.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authorization:boolean = false
  
  logedUserData : User = new User()
  isLogedIn : boolean = localStorage.getItem("Token") ? true : false

  baseUrl:string = "https://localhost:7091/api/"

  constructor(private http:HttpClient) { }


  authenticate(authenticationData : Authentication):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}Authentication/authenticate` , authenticationData)
  }

  get IsLogedIn () : Boolean {
    return this.isLogedIn
  } 


  set IsLogedIn (isLogedin : boolean ) {
    this.isLogedIn = isLogedin
  }



  recoverPassword(email:string):Observable<any>{
    return this.http.put(`${this.baseUrl}Authentication/recoverPassword`,{email})
  }

  getLogedUser():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}Authentication/get_loged_user`)
  }

  get LogedUserData () : User {
    return this.logedUserData
  } 


  set LogedUserData (useData : User ) {
    this.logedUserData = useData
  }


 

}
