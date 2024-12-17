import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    standalone: false
})
export class HeaderComponent implements OnInit {

 

  defaultPhoto: string = 'assets/images/default.png';
  logedUserId : number | null = null
  byteConvert : string = 'data:image/jpeg;base64,'
  logedUserData : User = new User()

  constructor(public auth:AuthenticationService){}

  ngOnInit(): void {
  
    const token = localStorage.getItem('Token'); 

    if (token) {
   
        this.auth.getLogedUser().subscribe(res => {
            this.auth.LogedUserData = res;
            this.logedUserData = this.auth.LogedUserData;
            localStorage.setItem('logedUserId', res.id); 
            this.logedUserId = res.id;
            console.log(res);
        });
    } else {
        console.warn('No token found. Redirecting to login...')     
    }
}


  logOut():void{
    localStorage.setItem("Token" , '')
  }

  toggleAuthorization():void{
    this.auth.authorization = !this.auth.authorization
  }
}
