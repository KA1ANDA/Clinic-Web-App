import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  byteConvert : string = 'data:image/jpeg;base64,'

  logedUserData : User = new User()
  constructor(public auth:AuthenticationService){}

  ngOnInit(): void {
    this.auth.getLogedUser().subscribe(res =>{
      this.auth.LogedUserData = res
      this.logedUserData = this.auth.LogedUserData
      console.log(res)
    })
  }

}
