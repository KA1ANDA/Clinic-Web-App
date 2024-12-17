import { Component } from '@angular/core';
import { DoctorsService } from '../../services/doctors.service';
import { DoctorSpecializationsService } from '../../services/doctor-specializations.service';

@Component({
    selector: 'app-categories-page',
    templateUrl: './categories-page.component.html',
    styleUrl: './categories-page.component.css',
    standalone: false
})
export class CategoriesPageComponent {

  defaultPhoto: string = 'assets/images/default.png';
  byteConvert : string = 'data:image/jpeg;base64,'
  
  constructor(public docdata : DoctorsService , public docSpecService : DoctorSpecializationsService ){}
  

  ngOnInit(): void {   
    this.docdata.getDoctors().subscribe((res) => {
      this.docdata.Doctors = res
    })}


    getSpecialization(id?:number):string | undefined{
      const specialization = this.docSpecService.Specializations?.find(
        (res) => res.id === id
      );
     
      return this.docSpecService.Specializations.find((specialization) => specialization.id === id)?.specializationName
    }  
    
}
