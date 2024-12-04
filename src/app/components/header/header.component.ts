import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  logedUserId : number | null = null
  byteConvert : string = 'data:image/jpeg;base64,'
  logedUserData : User = new User()
  constructor(public auth:AuthenticationService){}

  ngOnInit(): void {
    this.auth.getLogedUser().subscribe(res =>{
      this.auth.LogedUserData = res
      this.logedUserData = this.auth.LogedUserData
      localStorage.setItem("logedUserId" , res.id)
      this.logedUserId = res.id
      console.log(res)
    })

    

   
  }


  logOut():void{
    localStorage.setItem("Token" , '')
  }
}
