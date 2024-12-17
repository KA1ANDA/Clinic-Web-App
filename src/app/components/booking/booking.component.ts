import { Component, OnInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { DoctorsService } from '../../services/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { DoctorSpecializationsService } from '../../services/doctor-specializations.service';

@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.css'],
    standalone: false
})
export class BookingComponent implements OnInit{

  urlId! : number
  byteConvert : string = 'data:image/jpeg;base64,'

  constructor(public docdata : DoctorsService,  private route: ActivatedRoute , public docSpecService : DoctorSpecializationsService){}

  ngOnInit(): void {
    
    this.urlId = parseInt(this.route.snapshot.paramMap.get('id') || '');

    this.docdata.getDoctorById(this.urlId).subscribe((res) => {
      this.docdata.SelectedDoctor = res
      console.log(res , 'YEEEEEEESSSSSSSSSS')
    })
   
  }

  getSpecialization(id?:number):string | undefined{
    const specialization = this.docSpecService.Specializations?.find(
      (res) => res.id === id
    );
   
    return this.docSpecService.Specializations.find((specialization) => specialization.id === id)?.specializationName
  }
 
}
