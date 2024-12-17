import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorsService } from '../../services/doctors.service';
import { DoctorSpecializationsService } from '../../services/doctor-specializations.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.css',
    standalone: false
})
export class DoctorsComponent implements OnInit {

  defaultPhoto: string = 'assets/images/default.png';
  displayCount : number = 6
  doctors: Doctor[] = this.docdata.Doctors;
  byteConvert : string = 'data:image/jpeg;base64,'
  
  constructor(public docdata : DoctorsService , public docSpecService : DoctorSpecializationsService , public auth : AuthenticationService){}

  ngOnInit(): void {   
    this.docdata.getDoctors().subscribe((res) => {
      this.docdata.Doctors = res
      this.doctors = res
      this.updateVisibleDoctors()
  })
  
}

  updateVisibleDoctors():void{
    this.docdata.VisibleDoctors = this.doctors.slice(0 , this.displayCount)
  }

  loadMore():void{
    this.displayCount+=6
    this.updateVisibleDoctors()
  }


  
  getSpecialization(id?:number):string | undefined{
    const specialization = this.docSpecService.Specializations?.find(
      (res) => res.id === id
    );
   
    return this.docSpecService.Specializations.find((specialization) => specialization.id === id)?.specializationName
  }
}
