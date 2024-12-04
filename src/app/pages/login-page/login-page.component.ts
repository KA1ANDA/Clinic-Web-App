import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Authentication } from '../../models/authentication.model';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(private auth : AuthenticationService  , private fb:FormBuilder , private router: Router){}


  authObj : Authentication = new Authentication()
  errorMessage : string = ""

  recoverPasswordPage : boolean = false
  recoverPasswordEmail : string = ""

  formControl = this.fb.group({
    email : ["" , ],
    password : ["" , ],

  })

  

  authenticate() : void{
    this.authObj.email = this.formControl.value.email
    this.authObj.password = this.formControl.value.password

    this.auth.authenticate(this.authObj).pipe(
      catchError((err) => {
        this.errorMessage = "Email or Password is Incorrect"
        this.formControl.reset()
        console.error(err)
        return of(null); 
      })
    )
    .subscribe(
      res => localStorage.setItem("Token" , res.accessToken)
    )

  }


  toggleRecoverPassword() : void {
    this.recoverPasswordPage = !this.recoverPasswordPage
  }

  recoverPassword() : void{
    if(this.formControl.value.email){
      this.auth.recoverPassword(this.formControl.value.email).subscribe()
    }
    this.router.navigate(['login'])
  }

}
