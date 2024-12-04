import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {

  // doctors: Doctor[] = this.docdata.Doctors;
  byteConvert : string = 'data:image/jpeg;base64,'
  
  constructor(public docdata : DoctorsService){}

  ngOnInit(): void {   
    this.docdata.getDoctors().subscribe((res) => {
      this.docdata.Doctors = res
      // this.doctors = this.docdata.Doctors
 
    }
      
    )

  }
}
