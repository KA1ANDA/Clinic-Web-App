import { Component, OnInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { DoctorsService } from '../../services/doctors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'] 
})
export class BookingComponent implements OnInit{

  urlId! : number
  byteConvert : string = 'data:image/jpeg;base64,'

  constructor(public docdata : DoctorsService,  private route: ActivatedRoute){}

  ngOnInit(): void {
    
    this.urlId = parseInt(this.route.snapshot.paramMap.get('id') || '');

    this.docdata.getDoctorById(this.urlId).subscribe((res) => {
      this.docdata.SelectedDoctor = res
      console.log(res , 'YEEEEEEESSSSSSSSSS')
    })
   
  }

 
}
