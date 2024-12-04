import { Component } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {

  byteConvert : string = 'data:image/jpeg;base64,'
  
  constructor(public docdata : DoctorsService){}

  ngOnInit(): void {   
    this.docdata.getDoctors().subscribe((res) => {
      this.docdata.Doctors = res
    })}

}
