import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {

  urlId! : number
  byteConvert : string = 'data:image/jpeg;base64,'

  constructor(public docdata : DoctorsService ,  private route: ActivatedRoute , public booking : BookingService){}

  ngOnInit(): void {
    
    this.urlId = parseInt(this.route.snapshot.paramMap.get('id') || '');

    this.docdata.getDoctorById(this.urlId).subscribe((res) => {
      this.docdata.SelectedDoctor = res
      console.log(res , 'YEEEEEEESSSSSSSSSS')
    })
   
  }


  toggleDelete(): void {
    this.booking.toggleDelete();
  }

  toggleEdit(): void {
    this.booking.toggleEdit();
  }
}
